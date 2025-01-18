import { string, z } from "zod";

export const EventOrHackathon = z.object({
  name: z.string().min(2, "Name must be Atleast 2 Characters"),
  shortDescription: z
    .string()
    .min(2, "Description must be Atleast 2 Characters")
    .max(30, "Description should be short(30 Characters Max)"), 
  date: z.string().min(2),
  modeOfEvent: z.string().min(2),
  typeOfEvent: z.string().min(2),
  isOpen: z.boolean(),
  theme: z.array(string()),
  logo: z.string().min(2),
  loaction: z.string().min(2),
  prize: z.string().min(2),
  teamSize: z.string().min(2),
  aboutDescriptions: z
    .string()
    .min(50, "About Description must be Atleast 50 Characters"),
  eventPoster: z.string().min(2),
  instagramLink: z.string().min(2).optional(),
  twitterLink: z.string().min(2).optional(),
});
