import { z } from 'zod';

// Email Schema
export const emailSchema = z
  .email()
  .trim()
  .nonempty({ message: "Email is required" });


export const SigninSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .trim()
    .nonempty({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
});
