import { z } from "zod"

export const User = z
  .object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    username: z
      .string()
      .min(2, "Username should be at least 2 characters")
      .regex(/^[a-z0-9]+$/, "Username should only contain lowercase letters and numbers"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "Number should be at least 10 digits"),
    password: z
      .string()
      .min(6, "Password should be at least 6 characters")
      .max(20, "Password should not be longer than 20 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password should be at least 6 characters")
      .max(20, "Password should not be longer than 20 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

