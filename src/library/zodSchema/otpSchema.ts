import { z } from "zod";

export const otpSchema = z
  .object({
    number1: z.string().max(1).min(1,"Enter a 6-digit OTP"),
    number2: z.string().max(1).min(1),
    number3: z.string().max(1).min(1),
    number4: z.string().max(1).min(1),
    number5: z.string().max(1).min(1),
    number6: z.string().max(1).min(1),
  })
  .refine(
    (data) =>
      data.number1 &&
      data.number2 &&
      data.number3 &&
      data.number4 &&
      data.number5 &&
      data.number6,
    {
      message: "Enter a 6-digit OTP",
      path: ["number1"], 
    }
  );
