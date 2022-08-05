import { z } from "zod";

const schema = z.object({
  GREETING: z.string(),
});
export const CONFIG = schema.parse(process.env);

export const __PROD__ = process.env.NODE_ENV == "production";
export const __DEV__ = !__PROD__;
