import { z } from "zod";

export const profileFormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, {
        message: "First Name must be at least 2 characters.",
      })
      .max(30, {
        message: "First Name must not be longer than 30 characters.",
      }),
    lastName: z
      .string()
      .min(2, {
        message: "Last Name must be at least 2 characters.",
      })
      .max(30, {
        message: "Last Name must not be longer than 30 characters.",
      }),
    email: z
      .string()
      .min(1, {
        message: "Email must be at least 1 characters.",
      })
      .max(30, {
        message: "Email must not be longer than 30 characters.",
      }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 7 characters.",
      })
      .max(30, {
        message: "Username must not be longer than 30 characters.",
      }),
    new_password: z
      .string()
      .min(8, {
        message: "Password must be at least 7 characters.",
      })
      .max(30, {
        message: "Username must not be longer than 30 characters.",
      }),
    confirm_password: z
      .string()
      .min(8, {
        message: "Password must be at least 7 characters.",
      })
      .max(30, {
        message: "Username must not be longer than 30 characters.",
      }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["new_password"],
  });

export const registerUserFormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, {
        message: "First name must be at least 2 characters.",
      })
      .max(15, {
        message: "First name must not be longer than 30 characters.",
      }),
    lastName: z
      .string()
      .min(2, {
        message: "Last name must be at least 2 characters.",
      })
      .max(15, {
        message: "Last name must not be longer than 30 characters.",
      }),
    email: z.string().email({
      message: "Please enter a valid email.",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .max(30, {
        message: "Password must not be longer than 30 characters.",
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .max(30, {
        message: "Password must not be longer than 30 characters.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["password"],
  });

export const signinUserFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(30, {
      message: "Password must not be longer than 30 characters.",
    }),
});

export const projectFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Project name must be at least 2 characters.",
    })
    .max(15, {
      message: "Project name must not be longer than 30 characters.",
    }),
  description: z
    .string()
    .min(2, {
      message: "Project description must be at least 2 characters.",
    })
    .max(255, {
      message: "Project description must not be longer than 100 characters.",
    }),
  due: z.coerce.date(),
});

export const taskFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Task name must be at least 2 characters.",
    })
    .max(15, {
      message: "Task name must not be longer than 30 characters.",
    }),
  description: z
    .string()
    .min(2, {
      message: "Task description must be at least 2 characters.",
    })
    .max(255, {
      message: "Task description must not be longer than 255 characters.",
    }),
  due: z.coerce.date(),
  status: z.enum(["NOT_STARTED", "STARTED", "COMPLETED"]),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
export type ProjectFormValue = z.infer<typeof projectFormSchema>;
export type RegisterUserFormValue = z.infer<typeof registerUserFormSchema>;
export type TaskFormValue = z.infer<typeof taskFormSchema>;
export type SigninUserFormValue = z.infer<typeof signinUserFormSchema>;
