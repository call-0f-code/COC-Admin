import { number, z } from 'zod';

// Email Schema
export const emailSchema = z
  .string()
  .trim()
  .email({ message: "Please enter a valid email address" })
  .nonempty({ message: "Email is required" });

// Password Schema
export const passwordSchema = z
  .string()
  .trim()
  .nonempty({ message: "Password is required" })
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(64, { message: "Password cannot exceed 64 characters" })
  .regex(/[A-Z]/, {
    message: "Password must include at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must include at least one lowercase letter",
  })
  .regex(/\d/, { message: "Password must include at least one number" })
  .regex(/[^A-Za-z0-9]/, {
    message: "Password must include at least one special character",
  });

// Name Schema
export const nameSchema = z
  .string()
  .trim()
  .nonempty({ message: "Name is required" })
  .min(2, { message: "Name must be at least 2 characters long" })
  .max(50, { message: "Name cannot exceed 50 characters" });

// Create User Schema (Signup)
export const CreateUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
  passoutYear: z.number()
});

export const SigninSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .trim()
    .nonempty({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
});
