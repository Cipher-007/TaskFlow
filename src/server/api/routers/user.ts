import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { and, eq } from "drizzle-orm";
import { request, team, users, userToTeam } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  getAllUsers: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findMany();
  }),

  getUserOrganization: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findFirst({
      where: eq(users.id, ctx.session.user.id),
      columns: { organizationId: true },
    });
  }),

  getAllTeams: protectedProcedure.query(({ ctx }) => {
    return ctx.db
      .selectDistinct({
        id: team.id,
        name: team.name,
        createdAt: team.createdAt,
        updatedAt: team.updatedAt,
        organizationId: team.organizationId,
        description: team.description,
      })
      .from(team)
      .innerJoin(userToTeam, eq(userToTeam.userId, ctx.session.user.id));
  }),

  getCurrentUserInfo: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findFirst({
      where: eq(users.id, ctx.session.user.id),
      with: {
        // organization: { columns: { name: true } },
        // team: { columns: { id: true, name: true } },
        userToTeam: true,
      },
    });
  }),

  getUserInfo: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.query.users.findFirst({
      where: eq(users.id, input),
      with: {
        organization: { columns: { name: true } },
        // team: { columns: { id: true, name: true } },
        userToTeam: true,
      },
    });
  }),

  getApprovedEmployees: protectedProcedure
    .input(z.object({ organizationId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
          role: users.role,
          image: users.image,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
          onboarded: users.onboarded,
          theme: users.theme,
          organizationId: users.organizationId,
          globalRole: users.globalRole,
          requestId: users.requestId,
        })
        .from(users)
        .innerJoin(
          request,
          and(
            eq(request.userId, users.id),
            eq(request.status, "APPROVED"),
            eq(users.organizationId, input.organizationId),
          ),
        );
    }),

  isApproved: protectedProcedure.query(async ({ ctx }) => {
    const access = await ctx.db
      .select()
      .from(request)
      .where(eq(request.userId, ctx.session.user.id));

    return access[0]?.status === "APPROVED";
  }),

  isAdmin: protectedProcedure.query(async ({ ctx }) => {
    const access = await ctx.db.query.users.findFirst({
      where: eq(users.id, ctx.session.user.id),
      columns: { globalRole: true },
    });

    if (access && access.globalRole === "ADMIN") {
      return true;
    }

    return false;
  }),

  isOnboarded: protectedProcedure.query(async ({ ctx }) => {
    const access = await ctx.db.query.users.findFirst({
      where: eq(users.id, ctx.session.user.id),
      columns: { onboarded: true },
    });

    if (!access || !access.onboarded) {
      return false;
    }

    return true;
  }),

  updateTheme: protectedProcedure
    .input(z.object({ theme: z.enum(["light", "dark"]) }))
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(users)
        .set({ theme: input.theme })
        .where(eq(users.id, ctx.session.user.id));
    }),

  create: protectedProcedure
    .input(
      z.object({
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
        globalRole: z.enum(["ADMIN", "USER"]),
        theme: z.enum(["dark", "light"]),
        onboarded: z.boolean(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.update(users).set({
        role: input.role,
        globalRole: input.globalRole,
        theme: input.theme,
        onboarded: input.onboarded,
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        name: z.string().optional(),
        email: z.string().optional(),
        teamId: z.string().optional(),
        role: z
          .enum([
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
          ])
          .optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.teamId) {
        await ctx.db.insert(userToTeam).values({
          teamId: input.teamId,
          userId: input.id,
        });
      }
      return ctx.db
        .update(users)
        .set({
          name: input.name,
          email: input.email,
          role: input.role,
        })
        .where(eq(users.id, input.id));
    }),

  updateTeams: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        teams: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            toggle: z.boolean(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const promises = input.teams.map(async (team) => {
        if (team.toggle) {
          await ctx.db.insert(userToTeam).values({
            teamId: team.id,
            userId: input.id,
          });
        } else {
          await ctx.db
            .delete(userToTeam)
            .where(
              and(
                eq(userToTeam.teamId, team.id),
                eq(userToTeam.userId, users.id),
              ),
            );
        }
      });

      await Promise.all(promises);

      return true;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      return ctx.db.delete(users).where(eq(users.id, input.id));
    }),
});
