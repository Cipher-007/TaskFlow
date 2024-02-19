import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { projectRouter } from "./routers/project";
import { taskRouter } from "./routers/task";
import { organizationRouter } from "./routers/organization";
import { teamRouter } from "./routers/team";
import { commentRouter } from "./routers/comment";
import { requestsRouter } from "./routers/request";
import { permissionRouter } from "./routers/permission";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  commment: commentRouter,
  organization: organizationRouter,
  performance: permissionRouter,
  project: projectRouter,
  requests: requestsRouter,
  task: taskRouter,
  team: teamRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
