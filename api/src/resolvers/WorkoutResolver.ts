import { Mutation, Resolver } from "type-graphql";
import { Workout } from "../entity/Workout";
import { Context } from "../types";

function currentUnix(): number {
  return Math.floor(Date.now() / 1000) | 0;
}

@Resolver(Workout)
export default class WorkoutResolver {
  @Mutation(() => Workout)
  async createWorkout(ctx: Context) {
    const user = await ctx.user();
    if (user === null) return null;
    const workout = Workout.create({ author: user, startTs: currentUnix() });
    await workout.save();
    return workout;
  }
}
