import { Field, InputType, ObjectType } from "type-graphql";

import { User } from "../../entities/User";
import { ErrorType } from "../../Types";

// Inputs
@InputType()
export class SignUpInput {
  @Field()
  username: string

  @Field()
  password: string
}

@InputType()
export class SignInInput {
  @Field()
  username: string

  @Field()
  password: string
}

// Types
@ObjectType()
export class UserRespone {
  @Field(() => User, { nullable: true })
  user?: User

  @Field(() => [ErrorType], { nullable: true })
  error?: ErrorType[]
}