import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import { USERNAME_MAX, USERNAME_MIN } from "../../config";
import { User } from "../../entity/User";
import { Context } from "../../types";
import { hashPassword } from "./hashPassword";

@InputType()
class RegisterRequest {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class RegisterResponse {
  @Field(() => [FieldError])
  errors: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

const err = (field: string, message: string) => ({
  errors: [{ field, message }],
});

@Resolver(User)
export default class UserResolver {
  @Mutation(() => RegisterResponse)
  async register(
    @Ctx() { session: _session }: Context,
    @Arg("request", () => RegisterRequest)
    { username, password }: RegisterRequest
  ): Promise<RegisterResponse> {
    if (username.length < USERNAME_MIN)
      return err(
        "username",
        `Username must be at least ${USERNAME_MIN} characters`
      );
    if (username.length > USERNAME_MAX)
      return err(
        "username",
        `Username cannot be longer than ${USERNAME_MAX} characters`
      );

    const user = User.create({
      username,
      passwordHash: await hashPassword(password),
    });
    try {
      await user.save();
    } catch (e) {
      if (
        e &&
        e.message == "SqliteError: UNIQUE constraint failed: user.username"
      ) {
        return err("username", "Username is already taken");
      }
      throw e;
    }
    return { user, errors: [] };
  }
}
