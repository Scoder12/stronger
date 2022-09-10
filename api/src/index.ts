import fastifyCors from "@fastify/cors";
import fastifySecureSession from "@fastify/secure-session";
import { ApolloServer, FastifyContext } from "apollo-server-fastify";
import createFastify from "fastify";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { CONFIG } from "./config";
import { AppDataSource } from "./data-source";
import HelloResolver from "./resolvers/HelloResolver";
import UserResolver from "./resolvers/user/UserResolver";
import { Context } from "./types";

async function main() {
  console.log("config", CONFIG);
  await AppDataSource.initialize();

  const fastify = createFastify();
  fastify.register(fastifySecureSession, {
    cookieName: "session",
    key: Buffer.from(CONFIG.SESSION_SECRET, "hex"),
  });

  const schema = await buildSchema({
    resolvers: [HelloResolver, UserResolver],
  });
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    context: ({ request }: FastifyContext): Context => ({
      session: request.session,
    }),
  });
  await server.start();

  fastify.register(fastifyCors, {
    origin: CONFIG.CORS_ORIGINS,
    credentials: true,
  });
  fastify.register(server.createHandler({ cors: false }));

  const host = CONFIG.LISTEN_HOST;
  const port = Number(CONFIG.LISTEN_PORT);
  await fastify.listen({ host, port });
  console.log(`Listening on http://${host}:${port}`);
}

main();
