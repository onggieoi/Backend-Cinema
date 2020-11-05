import { MiddlewareFn } from "type-graphql";

import { User } from "../entities/User";
import { MyContext } from "../types";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error('Not authenticated');
  }
  return next();
}

export const isAuthor: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error('Not authenticated');
  }

  const user = await User.findOne({ id: context.req.session.userId });

  if (!user) {
    throw new Error('Not authorization');
  }

  return next();
}