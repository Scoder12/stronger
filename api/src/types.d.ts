import { Session } from "@fastify/secure-session";

export class Context {
  session: Session;

  constructor(session: Session) {
    this.session = session;
  }

  userId(): number | undefined {
    const uid = Number(this.session.get("userId"));
    if (isNaN(uid)) return null;
    return uid;
  }

  setUserId(userId: number) {
    this.session.set("userId", userId);
  }

  async user() {
    const id = this.userId();
    if (userId === null) return null;
    return await User.findOne({ where: { id } });
  }
}

declare module "@fastify/secure-session" {
  interface SessionData {
    userId: number;
  }
}
