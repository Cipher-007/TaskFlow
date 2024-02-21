import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { and, eq } from "drizzle-orm";
import { team, userToTeam } from "~/server/db/schema";

export const teamRouter = createTRPCRouter({
  getAll: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.query.team.findMany({
      where: eq(team.organizationId, input),
    });
  }),

  getAllUserTeams: protectedProcedure.query(({ ctx }) => {
    return ctx.db
      .select({
        id: team.id,
        name: team.name,
      })
      .from(team)
      .innerJoin(userToTeam, eq(team.id, userToTeam.teamId))
      .where(eq(userToTeam.userId, ctx.session.user.id));
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.team.findFirst({
        where: and(eq(team.id, input.id)),
      });
    }),

  connectUser: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.insert(userToTeam).values({
        teamId: input.teamId,
        userId: input.userId,
      });
    }),

  updateManyUsers: protectedProcedure
    .input(
      z.array(
        z.object({
          teamId: z.string(),
          userId: z.string().min(1),
          toggle: z.boolean(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      await Promise.all(
        input.map(async (item) => {
          if (item.toggle) {
            await ctx.db.insert(userToTeam).values({
              teamId: item.teamId,
              userId: item.userId,
            });
          } else {
            await ctx.db
              .delete(userToTeam)
              .where(
                and(
                  eq(userToTeam.teamId, item.teamId),
                  eq(userToTeam.userId, item.userId),
                ),
              );
          }
        }),
      );
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(4).min(1),
        description: z.string().min(4).min(1),
        organizationId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const teamId = await ctx.db
        .insert(team)
        .values({
          name: input.name,
          description: input.description,
          organizationId: input.organizationId,
        })
        .returning({ id: team.id });

      await ctx.db.insert(userToTeam).values({
        teamId: teamId[0]!.id,
        userId: ctx.session.user.id,
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(4),
        description: z.string().min(4),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(team)
        .set({
          name: input.name,
          description: input.description,
        })
        .where(eq(team.id, input.id));
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.delete(team).where(eq(team.id, input.id));
    }),
});
