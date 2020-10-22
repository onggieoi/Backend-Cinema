import { Resolver, Query, Ctx, Int, Arg, Mutation } from "type-graphql";

import { Test } from "../../entities/Test";
import { MyContext } from "../../types";

@Resolver()
export class TestResolver {
  @Query(() => [Test])
  async tests(): Promise<Test[]> {
    return await Test.find({});
  }

  @Query(() => Test, { nullable: true })
  async test(
    @Arg('id', () => Int) id: number,
  ): Promise<Test | null> {
    return await Test.findOne({ id }) || null;
  }

  @Mutation(() => Test, { nullable: true })
  async createTest(
    @Arg("title") title: string,
  ): Promise<Test | null> {
    return await Test.create({ title }).save() || null;
  }

  @Mutation(() => Test, { nullable: true })
  async updateTest(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string,
  ): Promise<Test | null> {
    const test = await Test.findOne({ id });
    if (!test) {
      return null;
    }

    await Test.update({ id }, { title });

    return test;
  }

  @Mutation(() => Boolean)
  async deleteTest(
    @Arg('id') id: number,
  ): Promise<boolean> {
    try {
      await Test.delete({ id });
    } catch (err) {
      if (err) return false;
    }

    return true;
  }
}