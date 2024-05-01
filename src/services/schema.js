import { z } from "zod";

export const ActivitySchema = z.object({
    activity: z.string().min(1, "Activity is Required"),
    duedate: z.date(),
});