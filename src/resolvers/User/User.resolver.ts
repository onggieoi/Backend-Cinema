import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql";
import argon2 from 'argon2';

import { User } from "../../entities/User";
import { MyContext } from "../../types";
import { SignInInput, SignUpInput, UserRespone } from './Types';
import { cookieName } from "../../config";

@Resolver()
export class UserResolver {
  // Sign Up
  @Mutation(() => UserRespone)
  async userSignUp(
    @Arg("data") data: SignUpInput,
    @Ctx() { req }: MyContext
  ): Promise<UserRespone> {
    const { username, password } = data;

    if (username.length <= 6) return {
      error: [
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
        error: [{ field: 'username', message: 'username already exists' }]
      }
    }

    // set cookie when sign up successful
    req.session.userId = user.id;

    return { user };
  }

  // Sign In
  @Mutation(() => UserRespone)
  async userSignIn(
    @Arg('data') data: SignInInput,
    @Ctx() { req }: MyContext
  ): Promise<UserRespone> {
    const { username, password } = data;
    const user = await User.findOne({ username });

    if (!user) return {
      error: [
        { field: 'username', message: "username doesn't exist" }
      ]
    }

    const isValid = await argon2.verify(user.password, password);

    if (!isValid) return {
      error: [
        { field: 'password', message: 'Invalid password' }
      ]
    }

    req.session.userId = user.id;

    return { user };
  }

  // Query Me
  @Query(() => User, { nullable: true })
  async me(
    @Ctx() { req }: MyContext
  ): Promise<User | null> {
    if (!req.session.userId) return null;

    return await User.findOne({ id: req.session.userId }) || null;
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