import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql";
import argon2 from 'argon2';

import { MyContext } from "../../types";
import { cookieName } from "../../config";
import { SignInInput, SignUpInput, UserRespone, CustomerRespone, SignInCustomerInput, } from './Types';
import { User } from "../../entities/User";
import { Customer } from "../../entities/Customer";

@Resolver()
export class AuthResolver {
  // ------------------------------------------- User ----------------------------------------------------------------------------
  // Sign Up
  @Mutation(() => UserRespone, { nullable: true })
  async userSignUp(
    @Arg("data") data: SignUpInput,
    @Ctx() { req }: MyContext
  ): Promise<UserRespone> {
    const { username, password, fullname } = data;

    if (username.length <= 6) return {
      errors: { field: 'user', message: 'username must be greater 6' }
    }

    const hashedPassword = await argon2.hash(password);
    const user = User.create({
      username, fullname,
      role: 3,
      password: hashedPassword
    });

    try {
      await user.save();
    } catch (error) {
      console.log('------------ ERROR ----------------', error);
      if (error) return {
        errors: { field: 'user', message: 'something went srong' }
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
      errors: { field: 'username', message: "username doesn't exist" }
    }

    const isValid = await argon2.verify(user.password, password);

    if (!isValid) return {
      errors: { field: 'password', message: 'Invalid password' }
    }

    req.session.userId = user.id;

    return { user };
  }

  // Query Me
  @Query(() => UserRespone, { nullable: true })
  async me(
    @Ctx() { req }: MyContext
  ): Promise<UserRespone> {
    if (!req.session.userId) return { errors: { field: 'user', message: 'user not found' } };

    return { user: await User.findOne({ id: req.session.userId }) };
  }

  // ------------------------------------------- Customer ----------------------------------------------------------------------------
  // Sign up
  @Mutation(() => CustomerRespone, { nullable: true })
  async customerSignUp(
    @Arg("data") data: SignInCustomerInput,
    @Ctx() { req }: MyContext
  ): Promise<CustomerRespone> {
    const { username, password, fullname, creditCardNumber, csv } = data;

    if (username.length <= 6) return {
      errors: { field: 'username', message: 'username must be greater 6' }
    }

    const hashedPassword = await argon2.hash(password);
    const customer = Customer.create({
      username,
      password: hashedPassword,
      fullname: fullname,
      creditCardNumber,
      csv
    });

    try {
      await customer.save();
    } catch (error) {
      console.log('------------ ERROR ----------------', error);
      if (error?.detail.includes('already exists')) return {
        errors: { field: 'username', message: 'username already exists' },
      }
    }

    // set cookie when sign up successful
    req.session.userId = customer.id;

    return { customer };
  }

  // Sign In
  @Mutation(() => CustomerRespone, { nullable: true })
  async customerSignIn(
    @Arg('data') data: SignInInput,
    @Ctx() { req }: MyContext
  ): Promise<CustomerRespone> {
    const { username, password } = data;
    const customer = await Customer.findOne({ username });

    if (!customer) return {
      errors: { field: 'username', message: "username doesn't exist" }
    }

    const isValid = await argon2.verify(customer.password, password);

    if (!isValid) return {
      errors: { field: 'password', message: 'Invalid password' }
    }

    req.session.userId = customer.id;

    return { customer };
  }

  @Query(() => CustomerRespone, { nullable: true })
  async meCustomer(
    @Ctx() { req }: MyContext
  ): Promise<CustomerRespone> {
    if (!req.session.userId) return { errors: { field: 'user', message: 'user not found' } };

    return { customer: await Customer.findOne({ id: req.session.userId }) };
  }

  // --------------------------------------------------------- 

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