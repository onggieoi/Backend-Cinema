import { Field, InputType, Int, ObjectType } from "type-graphql";

import { ScheduleTime } from "../../entities/ScheduleTime";

@InputType()
export class CreateScheduleInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field()
  date: string;

  @Field()
  location: string;

  @Field(() => Int)
  theaterId: number;

  @Field(() => Int)
  movieId: number;

  @Field()
  time: string;

  @Field(() => Int)
  price: number;
}

@InputType()
export class QuerySchedulesInput {
  @Field()
  date: string;

  @Field(() => String, { nullable: true })
  location?: string;
}

@ObjectType()
export class ScheduleRespone {
  @Field(() => ScheduleTime, { nullable: true })
  schedule: ScheduleTime;

  @Field(() => Boolean, { nullable: true })
  error: boolean;
}
