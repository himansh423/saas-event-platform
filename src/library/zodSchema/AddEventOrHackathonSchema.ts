import { z } from "zod";
export const EventOrHackathon = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  shortDescription: z
    .string()
    .min(2, "Description must be at least 2 characters")
    .max(30, "Description should be short (30 characters max)"),
  date: z.string().min(2, "Date is required"),
  modeOfEvent: z.string().min(2, "Mode of event is required"),
  typeOfEvent: z.string().min(2, "Type of event is required"),
  isOpen: z.boolean(),
  theme: z.array(z.string().min(1, "Theme cannot be empty")),
  logo: z.custom<FileList>().optional(),
  eventPoster: z.custom<FileList>().optional(),
  location: z.string().min(2, "Location must be at least 2 characters"),
  prize: z.string().min(2, "Prize information must be at least 2 characters"),
  teamSize: z
    .string()
    .min(2, "Team size information must be at least 2 characters"),
  aboutDescriptions: z
    .string()
    .min(50, "About description must be at least 50 characters"),

  instagramLink: z
    .string()
    .url("Instagram link must be a valid URL")
    .optional(),
  twitterLink: z.string().url("Twitter link must be a valid URL").optional(),
});
