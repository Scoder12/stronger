import "reflect-metadata";
import { DataSource } from "typeorm";
import { __DEV__ } from "./config";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: "database.sqlite",
  synchronize: __DEV__ && true,
  logging: true,
  entities: [User],
  migrations: [],
  subscribers: [],
});
