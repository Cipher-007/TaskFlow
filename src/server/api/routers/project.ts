import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { and, eq, ne } from "drizzle-orm";
import { permission, project } from "~/server/db/schema";

const permissionsType = z.enum([
  "ALL",
  "READ",
  "WRITE",
  "DELETE",
  "MODIFY",
  "NONE",
]);

const priorityType = z.enum(["LOW", "NORMAL", "HIGH"]);

export const projectRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db
      .select({
        id: project.id,
        name: project.name,
        description: project.description,
        priority: project.priority,
        startDate: project.startDate,
        endDate: project.endDate,
        createdAt: project.createdAt,
        teamId: project.teamId,
        updatedAt: project.updatedAt,
        organizationId: project.organizationId,
      })
      .from(project)
      .innerJoin(
        permission,
        and(
          eq(permission.projectId, project.id),
          and(
            eq(permission.userId, ctx.session.user.id),
            ne(permission.type, "NONE"),
          ),
        ),
      );
  }),

  getAllByTeam: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db
        .select({
          id: project.id,
          name: project.name,
          description: project.description,
          priority: project.priority,
          startDate: project.startDate,
          endDate: project.endDate,
          createdAt: project.createdAt,
          teamId: project.teamId,
          updatedAt: project.updatedAt,
          organizationId: project.organizationId,
        })
        .from(project)
        .where(eq(project.teamId, input.teamId))
        .innerJoin(
          permission,
          and(
            eq(permission.projectId, project.id),
            and(
              ne(permission.type, "NONE"),
              eq(permission.userId, ctx.session.user.id),
            ),
          ),
        );
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.project.findFirst({
        where: eq(project.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(4),
        description: z.string().min(4),
        priority: priorityType,
        startDate: z.date(),
        endDate: z.date(),
        organizationId: z.string(),
        teamId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const projectId = await ctx.db
        .insert(project)
        .values({
          name: input.name,
          description: input.description,
          priority: input.priority,
          startDate: input.startDate,
          endDate: input.endDate,
          organizationId: input.organizationId,
          teamId: input.teamId,
        })
        .returning({
          id: project.id,
        });

      await ctx.db.insert(permission).values({
        userId: ctx.session.user.id,
        projectId: projectId[0]?.id,
        type: "ALL",
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(4),
        description: z.string().min(4),
        priority: priorityType,
        startDate: z.date(),
        endDate: z.date(),
        permissionType: z
          .enum(["ALL", "READ", "WRITE", "DELETE", "MODIFY", "NONE"])
          .optional(),
        members: z
          .array(
            z.object({
              id: z.string().min(1),
              type: permissionsType,
            }),
          )
          .optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(project)
        .set({
          name: input.name,
          description: input.description,
          priority: input.priority,
          startDate: input.startDate,
          endDate: input.endDate,
        })
        .where(eq(project.id, input.id));

      await ctx.db
        .update(permission)
        .set({
          type: input.permissionType,
        })
        .where(eq(permission.projectId, input.id));
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.delete(project).where(eq(project.id, input.id));
    }),
});
