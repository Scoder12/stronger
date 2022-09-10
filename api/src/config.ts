import { z } from "zod";

const PORT_REGEX = /^\d{1,5}$/g;
const SESSION_SECRET_REGEX = /^[0-9a-f]{64}$/g;
const schema = z.object({
  SESSION_SECRET: z.string().regex(SESSION_SECRET_REGEX),
  LISTEN_HOST: z.string().default("127.0.0.1"),
  LISTEN_PORT: z.string().regex(PORT_REGEX).default("8080"),
  CORS_ORIGINS: z
    .string()
    .default("")
    .transform((val) => val.split(",")),
});
export const CONFIG = schema.parse(process.env);

export const __PROD__ = process.env.NODE_ENV == "production";
export const __DEV__ = !__PROD__;

export const USERNAME_MIN = 4;
export const USERNAME_MAX = 32;
