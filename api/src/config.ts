import { z } from "zod";

const schema = z.object({
  GREETING: z.string(),
});
export const CONFIG = schema.parse(process.env);
