import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { eq } from "drizzle-orm";
import { comment } from "~/server/db/schema";

export const commentRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.query.comment.findMany({
        where: eq(comment.projectId, input.projectId),
        with: {
          permission: {
            where: eq(comment.userId, ctx.session.user.id),
            columns: { type: true },
          },
        },
      });
    }),

  getByProjectId: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.comment.findMany({
        where: eq(comment.projectId, input.projectId),
        with: {
          user: true,
        },
      });
    }),

  create: protectedProcedure
    .input(z.object({ projectId: z.string(), content: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(comment).values({
        content: input.content,
        projectId: input.projectId,
        userId: ctx.session.user.id,
      });
    }),
});
