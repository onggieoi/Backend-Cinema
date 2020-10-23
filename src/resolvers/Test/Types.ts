import { Field, InputType, Int, ObjectType } from "type-graphql";

import { Test } from "../../entities/Test";
import { ErrorType } from "../ErrorType";

@InputType()
export class QueryOptions {
  @Field(() => Int, { nullable: true })
  limit: number;

  @Field(() => Int, { nullable: true })
  cursor: number;
}

@ObjectType()
export class TestsRespone {
  @Field(() => [Test], { nullable: true })
  tests?: Test[];

  @Field(() => [ErrorType], { nullable: true })
  errors?: ErrorType[];
}
