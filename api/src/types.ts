import { Session } from "@fastify/secure-session";
import { User } from "./entity/User";

export class Context {
  session: Session;

  constructor(session: Session) {
    this.session = session;
  }

  userId(): number | null {
    const uid = Number(this.session.get("userId"));
    if (isNaN(uid)) return null;
    return uid;
  }

  setUserId(userId: number) {
    this.session.set("userId", userId);
  }

  async user() {
    const id = this.userId();
    if (id === null) return null;
    return await User.findOne({ where: { id } });
  }
}

declare module "@fastify/secure-session" {
  interface SessionData {
    userId: number;
  }
}
