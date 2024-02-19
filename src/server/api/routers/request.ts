import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { request } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";

export const requestsRouter = createTRPCRouter({
  getAllRequests: protectedProcedure
    .input(z.object({ organizationId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.request.findMany({
        where: and(
          eq(request.organizationId, input.organizationId),
          eq(request.status, "PENDING"),
        ),
        with: {
          user: true,
        },
      });
    }),

  updateRequest: protectedProcedure
    .input(
      z.object({
        userId: z.string().nonempty(),
        teamId: z.string().optional(),
        status: z.enum(["APPROVED", "REJECTED", "PENDING"]),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(request)
        .set({
          status: input.status,
        })
        .where(eq(request.userId, input.userId));
    }),
});
