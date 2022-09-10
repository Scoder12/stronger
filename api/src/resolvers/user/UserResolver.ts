import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { USERNAME_MAX, USERNAME_MIN } from "../../config";
import { User } from "../../entity/User";
import { Context } from "../../types";
import { hashPassword, verifyPassword } from "./hashPassword";

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class MaybeUser {
  @Field(() => [FieldError])
  errors: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

const err = (field: string, message: string) => ({
  errors: [{ field, message }],
});
const ok = <T>(val: T) => ({ errors: [], val });

@Resolver(User)
export default class UserResolver {
  @Mutation(() => MaybeUser)
  async register(
    @Ctx() { session: _session }: Context,
    @Arg("username") username: string,
    @Arg("password") password: string
  ): Promise<MaybeUser> {
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
    return ok(user);
  }

  @Mutation(() => MaybeUser)
  async login(
    @Ctx() { session }: Context,
    @Arg("username") username: string,
    @Arg("password") password: string
  ): Promise<MaybeUser> {
    if (!username) return err("username", "Username is required");
    if (!password) return err("password", "Password is required");
    const user = await User.findOne({ where: { username } });
    if (!user) return err("username", "User does not exist");
    if (!(await verifyPassword(user.passwordHash, password)))
      return err("password", "Incorrect password");
    session.set("userId", user.id);
    return ok(user);
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { session }: Context): Promise<User | null> {
    const userId = session.get("userId");
    if (!userId) return null;
    return User.findOne({ where: { id: userId } });
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { session }: Context): Promise<boolean> {
    session.set("userId", undefined);
    return true;
  }
}
