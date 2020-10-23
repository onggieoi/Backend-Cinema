import { Resolver, Query, Int, Arg, Mutation, UseMiddleware } from "type-graphql";

import { isAuth } from "../../middleware/isAuthenticated";
import { Test } from "../../entities/Test";
import { QueryOptions, TestsRespone } from './Types';
import { getConnection } from "typeorm";

@Resolver()
export class TestResolver {
  @UseMiddleware(isAuth)
  @Query(() => TestsRespone)
  async tests(
    @Arg('query', () => QueryOptions, { nullable: true }) query: QueryOptions
  ): Promise<TestsRespone> {
    const tests = getConnection()
      .getRepository(Test)
      .createQueryBuilder('p')
      .orderBy('id')
      .take(query.limit || 5);

    if (query.cursor) tests.where('id > :cursor', { cursor: query.cursor });

    const test = await tests.getMany();

    return {
      tests: test,
    }
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
    try {
      await Test.update({ id }, { title });
    } catch (error) {
      console.log(error);
      return null;
    }

    return await Test.findOne({ id }) || null;
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