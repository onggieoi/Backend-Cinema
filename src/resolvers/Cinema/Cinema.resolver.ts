import { Field, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";

import { Cinema } from "../../entities/Cinema";
import { isAuth } from "../../middleware/isAuthenticated";

@Resolver()
export class CinemaResolver {
  @UseMiddleware(isAuth)
  @Query(() => Cinema)
  async cinemas(): Promise<Cinema[]> {
    const cinemas = await Cinema.find({ order: { id: 1 } });

    return cinemas;
  }
}