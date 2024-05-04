import { z } from "zod";

export const ActivitySchema = z.object({
  subject: z.string().min(1, "Activity is Required"),
  duedate: z.date(),
  familymember_id: z.string().min(1, "Family Member Required"),
});
