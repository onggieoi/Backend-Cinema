import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class GeneralReportRespone {
  @Field(() => Int)
  users: number;

  @Field(() => Int)
  movies: number;

  @Field(() => Int)
  total: number;
}

@ObjectType()
export class Transactions {
  @Field()
  user: string;

  @Field()
  location: string;

  @Field(() => Int)
  creditCardNumber: number;

  @Field(() => Int)
  price: number;
}

@ObjectType()
export class Chart {
  @Field(() => Int)
  month: number;

  @Field(() => Int)
  price: number;
}