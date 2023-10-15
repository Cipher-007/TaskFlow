import { hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { PermissionType, Priority, TASK_STATUS } from "@prisma/client";

const getRandomTaskStatus = () => {
  const statuses = [
    TASK_STATUS.DONE,
    TASK_STATUS.IN_PROGRESS,
    TASK_STATUS.ON_HOLD,
    TASK_STATUS.BACKLOG,
    TASK_STATUS.CANCELED,
    TASK_STATUS.TODO,
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const getRandomPriority = () => {
  const statuses = [Priority.LOW, Priority.NORMAL, Priority.HIGH];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const getRandomPermission = () => {
  const statuses = [
    PermissionType.ALL,
    PermissionType.READ,
    PermissionType.WRITE,
    PermissionType.MODIFY,
    PermissionType.DELETE,
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

async function main() {
  const organization = await db.organization.upsert({
    where: { email: "admin@projectverse.com" },
    update: {},
    create: {
      email: "admin@projectverse.com",
      name: "Projectverse",
      contact: "9876543210",
    },
  });

  const team = await db.team.create({
    data: {
      name: "Team Projectverse",
      description: "Team Projectverse",
      organizationId: organization.id,
    },
  });

  const john = await db.user.upsert({
    where: { email: "johndoe@projectverse.com" },
    update: {},
    create: {
      email: "johndoe@projectverse.com",
      firstName: "John",
      lastName: "Doe",
      contact: "9876543210",
      password: await hashPassword("password"),
      role: "ORGANIZATION_ADMIN",
      teamId: team.id,
      organizationId: organization.id,
      Request: {
        create: {
          organizationId: organization.id,
          status: "APPROVED",
        },
      },
    },
  });

  const user = await db.user.upsert({
    where: { email: "user@projectverse.com" },
    update: {},
    create: {
      email: "user@projectverse.com",
      firstName: "Gaurav",
      lastName: "Deshmukh",
      password: await hashPassword("password"),
      role: "DEVELOPER",
      contact: "9876543211",
      organizationId: organization.id,
      Request: {
        create: {
          organizationId: organization.id,
          status: "PENDING",
        },
      },
    },
  });

  const project1 = await db.project.create({
    data: {
      name: "Projectverse Website",
      description: "Projectverse website description",
      organizationId: organization.id,
      teamId: team.id,
      startDate: new Date(),
      endDate: new Date(),
      priority: "LOW",
      permissions: {
        create: {
          type: "ALL",
          userId: john.id,
        },
      },
      tasks: {
        createMany: {
          data: new Array(10).fill(1).map((_, i) => {
            return {
              name: `Task ${i}`,
              description: `Everything that describes Task ${i}`,
              startDate: new Date(2023, 11, 25),
              endDate: new Date(2023, 12, 25),
              status: getRandomTaskStatus(),
              organizationId: organization.id,
              teamId: team.id,
              priority: getRandomPriority(),
            };
          }),
        },
      },
    },
  });

  const project2 = await db.project.create({
    data: {
      name: "Blog",
      description: "Blog Description",
      organizationId: organization.id,
      teamId: team.id,
      startDate: new Date(),
      endDate: new Date(),
      priority: getRandomPriority(),
      permissions: {
        create: {
          type: "READ",
          userId: john.id,
        },
      },
      tasks: {
        createMany: {
          data: new Array(10).fill(1).map((_, i) => {
            return {
              name: `Task ${2 * i}`,
              description: `Everything that describes Task ${i * 2}`,
              startDate: new Date(2023, 11, 25),
              endDate: new Date(2023, 12, 25),
              status: getRandomTaskStatus(),
              organizationId: organization.id,
              teamId: team.id,
              priority: getRandomPriority(),
            };
          }),
        },
      },
    },
  });

  const tasks = await db.task.findMany({
    where: {
      projectId: project1.id,
    },
  });

  tasks.map(async (task) => {
    await db.task.update({
      where: { id: task.id },
      data: {
        permissions: {
          create: {
            type: getRandomPermission(),
            userId: john.id,
          },
        },
      },
    });
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
