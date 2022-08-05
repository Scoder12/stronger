import { Query, Resolver } from "type-graphql";

@Resolver()
export default class HelloResolver {
  @Query()
  hello(): String {
    return "Hello, world!";
  }
}
