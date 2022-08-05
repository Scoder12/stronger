import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

async function main() {
  await AppDataSource.initialize();

  console.log("Inserting a new user into the database...");
  const user = User.create({
    firstName: "Timber",
    lastName: "Saw",
    age: 25,
  });
  await user.save();
  console.log(user.hasId());
  console.log("Saved a new user with id: " + user.id);

  console.log("Loading users from the database...");
  const users = await User.find();
  console.log("Loaded users: ", users);

  console.log(
    "Here you can setup and run express / fastify / any other framework."
  );
}

main();
