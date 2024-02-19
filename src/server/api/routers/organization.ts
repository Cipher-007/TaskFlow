import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  organization,
  request,
  team,
  users,
  userToTeam,
} from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const organizationRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.organization.findMany({
      columns: { id: true, name: true },
    });
  }),

  getApprovedEmployees: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const res = await ctx.db
        .selectDistinctOn([users.id], {
          id: users.id,
          name: users.name,
          teamId: team.id,
          requestStatus: request.status,
        })
        .from(userToTeam)
        .innerJoin(users, eq(users.id, userToTeam.userId))
        .innerJoin(team, eq(team.id, userToTeam.teamId))
        .innerJoin(request, eq(request.id, users.requestId))
        .where(eq(users.organizationId, input));

      return res
        .filter((item) => item.requestStatus === "APPROVED")
        .map((item) => ({
          id: item.id,
          name: item.name,
          teamId: item.teamId,
        }));
    }),

  connectUser: protectedProcedure
    .input(
      z.object({
        organizationId: z.string(),
        role: z.enum([
          "TEAM_LEAD",
          "PRODUCT_OWNER",
          "PROJECT_MANAGER",
          "DEVELOPER",
          "FRONTEND_DEVELOPER",
          "BACKEND_DEVELOPER",
          "FULL_STACK_DEVELOPER",
          "QA_TESTER",
          "DEVOPS_ENGINEER",
          "DESIGNER",
        ]),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .update(users)
        .set({
          organizationId: input.organizationId,
          role: input.role,
          globalRole: "USER",
        })
        .where(eq(users.id, input.userId));

      await ctx.db.insert(request).values({
        organizationId: input.organizationId,
        status: "PENDING",
        userId: input.userId,
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        organizationName: z.string().min(4),
        organizationEmail: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (trx) => {
        const org = await trx
          .insert(organization)
          .values({
            name: input.organizationName,
            email: input.organizationEmail,
          })
          .returning({ id: organization.id });

        const defaultTeam = await trx
          .insert(team)
          .values({
            name: `${input.organizationName} Team`,
            description: `${input.organizationName} Team`,
            organizationId: org[0]!.id,
          })
          .returning({ id: team.id });

        const approved = await trx
          .insert(request)
          .values({
            organizationId: org[0]!.id,
            status: "APPROVED",
            userId: ctx.session.user.id,
          })
          .returning({ id: request.id });

        await trx.update(users).set({
          organizationId: org[0]!.id,
          globalRole: "ADMIN",
          requestId: approved[0]!.id,
        });

        await trx.insert(userToTeam).values({
          teamId: defaultTeam[0]!.id,
          userId: ctx.session.user.id,
        });
      });
    }),
});
