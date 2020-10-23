import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ErrorType {
  @Field()
  field: string;

  @Field()
  message: string;
}