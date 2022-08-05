import { ApolloServer } from "apollo-server-fastify";
import fastify from "fastify";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./data-source";
import HelloResolver from "./resolvers/HelloResolver";

async function main() {
  await AppDataSource.initialize();
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });
  const app = fastify();
  const server = new ApolloServer({
    schema,
  });
  await server.start();
  app.register(server.createHandler());

  const host = "127.0.0.1";
  const port = 8080;
  await app.listen({ host, port });
  console.log(`Listening on http://${host}:${port}`);
}

main();
