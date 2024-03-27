import type { AdapterAccount } from "@auth/core/adapters";
import { relations, sql, type InferSelectModel } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const permissionType = pgEnum("PermissionType", [
  "ALL",
  "READ",
  "WRITE",
  "MODIFY",
  "DELETE",
  "NONE",
]);
export const taskStatus = pgEnum("TASK_STATUS", [
  "TODO",
  "IN_PROGRESS",
  "ON_HOLD",
  "DONE",
  "CANCELED",
  "BACKLOG",
]);
export const priority = pgEnum("Priority", ["HIGH", "NORMAL", "LOW"]);
export const requestStatus = pgEnum("RequestStatus", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);
export const theme = pgEnum("Theme", ["dark", "light"]);
export const globalRole = pgEnum("GlobalRole", ["ADMIN", "USER"]);
export const userRole = pgEnum("UserRole", [
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
]);

export const type = pgEnum("Type", ["oauth", "oidc", "email"]);

export const pgTable = pgTableCreator((name) => `projectverse_${name}`);

export const users = pgTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date(),
  ),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
  role: userRole("role").default("DEVELOPER").notNull(),
  theme: theme("theme").default("dark").notNull(),
  organizationId: uuid("organization_id").references(() => organization.id),
  requestId: uuid("request_id"),
  globalRole: globalRole("globalRole").default("USER").notNull(),
  onboarded: boolean("onboarded").default(false).notNull(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  organization: one(organization, {
    fields: [users.organizationId],
    references: [organization.id],
  }),
  request: one(request, {
    fields: [users.requestId],
    references: [request.id],
  }),
  permission: many(permission),
  comment: many(comment),
  userToTeam: many(userToTeam),
}));

export const accounts = pgTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = pgTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const organization = pgTable(
  "organization",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", {
      mode: "date",
      precision: 3,
    }).$onUpdate(() => new Date()),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
  },
  (table) => {
    return {
      nameKey: uniqueIndex("Organization_name_key").on(table.name),
      emailKey: uniqueIndex("Organization_email_key").on(table.email),
    };
  },
);

export const organizationRelations = relations(organization, ({ many }) => ({
  employees: many(users),
  team: many(team),
  task: many(task),
  project: many(project),
  request: many(request),
}));

export const team = pgTable(
  "team",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", {
      mode: "date",
      precision: 3,
    }).$onUpdate(() => new Date()),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description").notNull(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      nameKey: uniqueIndex("Team_name_key").on(table.name),
    };
  },
);

export const teamRelations = relations(team, ({ one, many }) => ({
  organization: one(organization, {
    fields: [team.organizationId],
    references: [organization.id],
  }),
  userToTeam: many(userToTeam),
  project: many(project),
  task: many(task),
}));

export const userToTeam = pgTable(
  "usertoteam",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    teamId: uuid("team_id")
      .notNull()
      .references(() => team.id, { onDelete: "cascade" }),
  },
  (t) => ({ pk: primaryKey({ columns: [t.userId, t.teamId] }) }),
);

export const userToTeamRelations = relations(userToTeam, ({ one }) => ({
  user: one(users, { fields: [userToTeam.userId], references: [users.id] }),
  team: one(team, { fields: [userToTeam.teamId], references: [team.id] }),
}));

export const project = pgTable(
  "project",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", {
      mode: "date",
      precision: 3,
    }).$onUpdate(() => new Date()),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description").notNull(),
    priority: priority("priority").default("NORMAL").notNull(),
    teamId: uuid("teamId")
      .notNull()
      .references(() => team.id, { onDelete: "cascade" }),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    startDate: timestamp("startDate").notNull(),
    endDate: timestamp("endDate").notNull(),
  },
  (table) => {
    return {
      nameKey: uniqueIndex("Project_name_key").on(table.name),
      nameIdx: index("Project_name_idx").on(table.name),
    };
  },
);

export const projectRelations = relations(project, ({ one, many }) => ({
  team: one(team, { fields: [project.teamId], references: [team.id] }),
  organization: one(organization, {
    fields: [project.organizationId],
    references: [organization.id],
  }),
  task: many(task),
  comment: many(comment),
  permission: many(permission),
}));

export const task = pgTable("task", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date(),
  ),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),
  projectId: uuid("projectId")
    .notNull()
    .references(() => project.id, { onDelete: "cascade" }),
  status: taskStatus("status").default("TODO").notNull(),
  priority: priority("priority").default("NORMAL").notNull(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  teamId: uuid("team_id")
    .notNull()
    .references(() => team.id, { onDelete: "cascade" }),
});

export const taskRelations = relations(task, ({ one, many }) => ({
  project: one(project, { fields: [task.projectId], references: [project.id] }),
  team: one(team, { fields: [task.teamId], references: [team.id] }),
  organization: one(organization, {
    fields: [task.organizationId],
    references: [organization.id],
  }),
  permission: many(permission),
}));

export const comment = pgTable(
  "comment",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", {
      mode: "date",
      precision: 3,
    }).$onUpdate(() => new Date()),
    projectId: uuid("project_id").notNull(),
    userId: varchar("createdById", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
  },
  (table) => {
    return {
      projectIdIdx: index("Comment_projectId_idx").on(table.projectId),
    };
  },
);

export const commentRelations = relations(comment, ({ one, many }) => ({
  project: one(project, {
    fields: [comment.projectId],
    references: [project.id],
  }),
  user: one(users, { fields: [comment.userId], references: [users.id] }),
  permission: many(permission),
}));

export const permission = pgTable(
  "permission",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    type: permissionType("type").default("NONE").notNull(),
    userId: varchar("createdById", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    projectId: uuid("project_id").references(() => project.id, {
      onDelete: "cascade",
    }),
    taskId: uuid("task_id").references(() => task.id, {
      onDelete: "cascade",
    }),
    commentId: uuid("comment_id").references(() => comment.id, {
      onDelete: "cascade",
    }),
  },
  (table) => {
    return {
      userIdProjectIdTaskIdCommentIdIdx: index("Permission_userId_idx").on(
        table.userId,
      ),
    };
  },
);

export const permissionRelations = relations(permission, ({ one }) => ({
  user: one(users, { fields: [permission.userId], references: [users.id] }),
  project: one(project, {
    fields: [permission.projectId],
    references: [project.id],
  }),
  task: one(task, { fields: [permission.taskId], references: [task.id] }),
  comment: one(comment, {
    fields: [permission.commentId],
    references: [comment.id],
  }),
}));

export const request = pgTable(
  "request",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at", {
      mode: "date",
      precision: 3,
    }).$onUpdate(() => new Date()),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    userId: varchar("createdById", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    status: requestStatus("status").default("PENDING").notNull(),
  },
  (table) => {
    return {
      userIdKey: uniqueIndex("Request_userId_key").on(table.userId),
    };
  },
);

export const requestRelations = relations(request, ({ one }) => ({
  organization: one(organization, {
    fields: [request.organizationId],
    references: [organization.id],
  }),
  user: one(users, { fields: [request.userId], references: [users.id] }),
}));

export type Users = InferSelectModel<typeof users>;
export type Organization = InferSelectModel<typeof organization>;
export type Team = InferSelectModel<typeof team>;
export type UserToTeam = InferSelectModel<typeof userToTeam>;
export type Project = InferSelectModel<typeof project>;
export type Task = InferSelectModel<typeof task>;
export type Comment = InferSelectModel<typeof comment>;
export type Permission = InferSelectModel<typeof permission>;
export type Request = InferSelectModel<typeof request>;
