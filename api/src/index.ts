import fastifySecureSession from "@fastify/secure-session";
import { ApolloServer } from "apollo-server-fastify";
import createFastify from "fastify";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { CONFIG } from "./config";
import { AppDataSource } from "./data-source";
import HelloResolver from "./resolvers/HelloResolver";

async function main() {
  await AppDataSource.initialize();

  const fastify = createFastify();
  fastify.register(fastifySecureSession, {
    cookieName: "session",
    key: Buffer.from(CONFIG.SESSION_SECRET, "hex"),
  });

  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });
  const server = new ApolloServer({
    schema,
    context: (params) => {
      console.log({ params });
    },
  });
  await server.start();
  fastify.register(server.createHandler());

  const host = CONFIG.LISTEN_HOST;
  const port = Number(CONFIG.LISTEN_PORT);
  await fastify.listen({ host, port });
  console.log(`Listening on http://${host}:${port}`);
}

main();
