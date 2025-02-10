import { z } from "zod";

export const Bio = z.object({
 bio: z.string().max(100),
})