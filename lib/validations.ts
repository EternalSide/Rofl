import * as z from "zod";

export const Questions_Schema = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(15).max(10000),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});
