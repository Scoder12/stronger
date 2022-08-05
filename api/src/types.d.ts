import { Session } from "@fastify/secure-session";

export type Context = {
  session: Session;
};
