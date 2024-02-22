import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { permission } from "~/server/db/schema";

const permissionsType = z.enum([
  "ALL",
  "READ",
  "WRITE",
  "DELETE",
  "MODIFY",
  "NONE",
]);

export const permissionRouter = createTRPCRouter({
  createProjectPermission: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        projectId: z.string(),
        permissions: permissionsType,
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(permission).values({
        userId: input.userId,
        projectId: input.projectId,
        type: input.permissions,
      });
    }),

  createTaskPermission: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        taskId: z.string(),
        permissions: permissionsType,
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(permission).values({
        userId: input.userId,
        taskId: input.taskId,
        type: input.permissions,
      });
    }),

  createPermission: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        commentId: z.string(),
        permissions: permissionsType,
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(permission).values({
        userId: input.userId,
        commentId: input.commentId,
        type: input.permissions,
      });
    }),
});
