import { Field, InputType, ObjectType, Int, } from "type-graphql";

import { User } from "../../entities/User";
import { ErrorType } from "../ErrorType";
import { Customer } from "../../entities/Customer";

// Inputs
@InputType()
export class SignUpInput {
  @Field()
  username: string

  @Field()
  password: string

  @Field()
  fullname: string
}

@InputType()
export class SignInInput {
  @Field()
  username: string

  @Field()
  password: string
}

@InputType()
export class SignInCustomerInput {
  @Field()
  username: string

  @Field()
  password: string

  @Field()
  fullname: string

  @Field(() => Int)
  creditCardNumber: number

  @Field(() => Int)
  csv: number
}

@ObjectType()
export class UserRespone {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => ErrorType, { nullable: true })
  errors?: ErrorType;
}

@ObjectType()
export class CustomerRespone {
  @Field(() => Customer, { nullable: true })
  customer?: Customer;

  @Field(() => ErrorType, { nullable: true })
  errors?: ErrorType;
}
