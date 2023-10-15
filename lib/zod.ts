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
    contact: z.string().min(10, {
      message: "Please enter a valid phone number",
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

export const IndividualRegistrationFormSchema = z
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
    contact: z.string().min(10, {
      message: "Please enter a valid phone number",
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
    organizationId: z.string(),
    role: z.enum([
      "ORGANIZATION_ADMIN",
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
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match.",
      });
  });

export const commentFormSchema = z.object({
  comment: z.string().min(1, {
    message: "Comment must be at least 1 characters.",
  }),
});

export const organizationRegistrationSchema = z
  .object({
    organizationName: z.string().min(2, {
      message: "Organization name must be at least 2 characters long",
    }),
    organizationcontact: z.string().min(10, {
      message: "Please enter a valid phone number",
    }),
    organizationemail: z.string().email({
      message: "Please enter a valid email",
    }),
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
      message: "Please enter a valid email",
    }),
    contact: z.string().min(10, {
      message: "Please enter a valid phone number",
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
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signinFormSchema = z.object({
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
    .max(30, {
      message: "Project name must not be longer than 30 characters.",
    }),
  description: z.string().min(2, {
    message: "Project description must be at least 2 characters.",
  }),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  priority: z.enum(["LOW", "NORMAL", "HIGH"]),
});

export const approvalFormSchema = z.object({
  teamId: z.string(),
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
  endDate: z.coerce.date(),
  startDate: z.coerce.date(),
  priority: z.enum(["LOW", "NORMAL", "HIGH"]),
  status: z.enum([
    "TODO",
    "IN_PROGRESS",
    "ON_HOLD",
    "DONE",
    "CANCELED",
    "BACKLOG",
  ]),
});

export const teamFormSchema = z.object({
  name: z.string().min(4, {
    message: "Team name must be at least 2 characters.",
  }),
  description: z.string().min(4, {
    message: "Team description must be at least 2 characters.",
  }),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
export type ProjectFormValue = z.infer<typeof projectFormSchema>;
export type IndividualRegistrationFormValue = z.infer<
  typeof IndividualRegistrationFormSchema
>;
export type OrganizationRegistrationFormValue = z.infer<
  typeof organizationRegistrationSchema
>;
export type TaskFormValue = z.infer<typeof taskFormSchema>;
export type SigninFormValue = z.infer<typeof signinFormSchema>;
export type ApprovalFormValue = z.infer<typeof approvalFormSchema>;
export type CommentFormValue = z.infer<typeof commentFormSchema>;
export type TeamFormValue = z.infer<typeof teamFormSchema>;
