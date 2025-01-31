import { z } from "zod"

export const TeamUpSchema = z.object({
  hackName: z.string().min(1, "Hackathon/Event Name is required"),
  description: z.string().min(1, "Description is required").max(50, "Description must be 50 characters or less"),
  dateStart: z.string().min(1, "Start Date is required"),
  dateEnd: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  mobileNumber: z.string().min(1, "Mobile Number is required"),
  eventOrHackathonUrl: z.string().url("Must be a valid URL"),
})

export type TeamUpFormData = z.infer<typeof TeamUpSchema>

