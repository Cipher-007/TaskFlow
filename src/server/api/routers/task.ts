import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { and, eq, ne } from "drizzle-orm";
import { permission, task } from "~/server/db/schema";

const priorityType = z.enum(["LOW", "NORMAL", "HIGH"]);
const statusType = z.enum([
  "TODO",
  "IN_PROGRESS",
  "ON_HOLD",
  "CANCELED",
  "BACKLOG",
  "DONE",
]);

export const taskRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db
      .select({
        id: task.id,
        name: task.name,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        endDate: task.endDate,
        createdAt: task.createdAt,
        teamId: task.teamId,
        updatedAt: task.updatedAt,
        organizationId: task.organizationId,
        projectId: task.projectId,
        status: task.status,
      })
      .from(task)
      .innerJoin(
        permission,
        and(
          eq(permission.taskId, task.id),
          and(
            eq(permission.userId, ctx.session.user.id),
            ne(permission.type, "NONE"),
          ),
        ),
      );
  }),

  getAllByProject: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db
        .select({
          id: task.id,
          name: task.name,
          description: task.description,
          priority: task.priority,
          startDate: task.startDate,
          endDate: task.endDate,
          createdAt: task.createdAt,
          teamId: task.teamId,
          updatedAt: task.updatedAt,
          organizationId: task.organizationId,
          projectId: task.projectId,
          status: task.status,
        })
        .from(task)
        .innerJoin(
          permission,
          and(
            eq(permission.taskId, task.id),
            and(
              eq(permission.userId, ctx.session.user.id),
              ne(permission.type, "NONE"),
            ),
          ),
        )
        .where(eq(task.projectId, input.projectId));
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.task.findFirst({
        where: eq(task.id, input.id),
        with: {
          permission: {
            where: eq(task.id, input.id),
          },
        },
      });
    }),

  getCountByProject: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      const tasks = await ctx.db
        .select()
        .from(task)
        .where(eq(task.projectId, input.projectId));

      const total = tasks.length;
      const completed = tasks.filter((task) => task.status === "DONE").length;

      return { completed, total };
    }),

  create: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        name: z.string().min(4),
        description: z.string().min(4),
        status: statusType,
        priority: priorityType,
        startDate: z.date(),
        endDate: z.date(),
        organizationId: z.string(),
        teamId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const taskId = await ctx.db
        .insert(task)
        .values({
          name: input.name,
          description: input.description,
          endDate: input.endDate,
          priority: input.priority,
          projectId: input.projectId,
          startDate: input.startDate,
          status: input.status,
          teamId: input.teamId,
          organizationId: input.organizationId,
        })
        .returning({ id: task.id });

      await ctx.db.insert(permission).values({
        userId: ctx.session.user.id,
        taskId: taskId[0]!.id,
        type: "ALL",
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(4),
        description: z.string().min(4),
        status: statusType,
        priority: priorityType,
        startDate: z.date(),
        endDate: z.date(),
        teamId: z.string(),
        projectId: z.string().optional(),
        permission: z
          .enum(["ALL", "READ", "WRITE", "DELETE", "MODIFY", "NONE"])
          .optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(task)
        .set({
          name: input.name,
          description: input.description,
          endDate: input.endDate,
          priority: input.priority,
          projectId: input.projectId,
          startDate: input.startDate,
          status: input.status,
          teamId: input.teamId,
        })
        .where(eq(task.id, input.id));

      await ctx.db
        .update(permission)
        .set({
          type: input.permission,
        })
        .where(eq(permission.taskId, input.id));
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(task).where(eq(task.id, input.id));
      await ctx.db.delete(permission).where(eq(permission.taskId, input.id));
    }),
});
