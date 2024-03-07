import { createTRPCRouter } from "~/server/api/trpc";
import { commentRouter } from "./routers/comment";
import { organizationRouter } from "./routers/organization";
import { permissionRouter } from "./routers/permission";
import { projectRouter } from "./routers/project";
import { requestsRouter } from "./routers/request";
import { taskRouter } from "./routers/task";
import { teamRouter } from "./routers/team";
import { userRouter } from "./routers/user";

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
