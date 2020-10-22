import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Request, Response, Express } from "express";
import { ObjectType, Field } from "type-graphql"

export type MyContext = {
  req: Request & { session: Express.Session };
  res: Response;
};

@ObjectType()
export class ErrorType {
  @Field()
  field: string

  @Field()
  message: string
}
