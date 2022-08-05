import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./data-source";
import { HelloResolver } from "./resolvers/Hello";

async function main() {
  await AppDataSource.initialize();
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });
  console.log(schema);
}

main();
