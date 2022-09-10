import { Session } from "@fastify/secure-session";

export type Context = {
  session: Session;
};

declare module "@fastify/secure-session" {
  interface SessionData {
    userId: number;
  }
}
