import { Field, InputType, Int, ObjectType } from "type-graphql";

@InputType()
export class CreateMovieInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  type: string;

  @Field()
  director: string;

  @Field()
  producer: string;

  @Field()
  country: string;

  @Field(() => Int)
  duration: number;

  @Field()
  thumbnail: string;

  @Field()
  isShow: boolean;

  @Field(() => [String])
  images: string[];
}

// @ObjectType()
// export class CustomerRespone {
//   @Field(() => Customer, { nullable: true })
//   customer?: Customer;

//   @Field(() => ErrorType, { nullable: true })
//   errors?: ErrorType;
// }