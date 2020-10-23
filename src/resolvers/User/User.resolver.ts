import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql";
import argon2 from 'argon2';

import { User } from "../../entities/User";
import { MyContext } from "../../types";
import { SignInInput, SignUpInput, UserRespone, } from './Types';
import { cookieName } from "../../config";

@Resolver()
export class UserResolver {
  // Sign Up
  @Mutation(() => UserRespone, { nullable: true })
  async userSignUp(
    @Arg("data") data: SignUpInput,
    @Ctx() { req }: MyContext
  ): Promise<UserRespone> {
    const { username, password } = data;

    if (username.length <= 6) return {
      errors: [
        { field: 'username', message: 'username must be greater 6' }
      ]
    }

    const hashedPassword = await argon2.hash(password);
    const user = User.create({
      username,
      password: hashedPassword
    });

    try {
      await user.save();
    } catch (error) {
      console.log('------------ ERROR ----------------', error);
      if (error?.detail.includes('already exists')) return {
        errors: [{ field: 'username', message: 'username already exists' }]
      }
    }

    // set cookie when sign up successful
    req.session.userId = user.id;

    return { user };
  }

  // Sign In
  @Mutation(() => UserRespone, { nullable: true })
  async userSignIn(
    @Arg('data') data: SignInInput,
    @Ctx() { req }: MyContext
  ): Promise<UserRespone> {
    const { username, password } = data;
    const user = await User.findOne({ username });

    if (!user) return {
      errors: [
        { field: 'username', message: "username doesn't exist" }
      ]
    }

    const isValid = await argon2.verify(user.password, password);

    if (!isValid) return {
      errors: [
        { field: 'password', message: 'Invalid password' }
      ]
    }

    req.session.userId = user.id;

    return { user };
  }

  // Query Me
  @Query(() => UserRespone, { nullable: true })
  async me(
    @Ctx() { req }: MyContext
  ): Promise<UserRespone> {
    if (!req.session.userId) return { errors: [{ field: 'user', message: 'user not found' }] };

    return { user: await User.findOne({ id: req.session.userId }) };
  }

  // logout
  @Mutation(() => Boolean)
  logout(
    @Ctx() { req, res }: MyContext
  ) {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie(cookieName);

        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    })
  }
}