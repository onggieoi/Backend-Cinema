import { Resolver, Query, Ctx, Arg, Mutation, UseMiddleware, Int } from "type-graphql";

import { isAuthor } from "../../middleware/isAuthenticated";
import { Movie } from "../../entities/Movie";
import { Image } from "../../entities/Image";
import { CreateMovieInput } from "./Types";

@Resolver()
export class AuthResolver {
  // List Movies
  @Query(() => [Movie])
  @UseMiddleware(isAuthor)
  async movies() {
    return await Movie.find({
      relations: ['images'],
    });
  };

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthor)
  async createMovie(
    @Arg('data') data: CreateMovieInput
  ) {
    let result = true;
    const {
      name,
      description,
      type,
      director,
      producer,
      country,
      duration,
      thumbnail,
      isShow,
      images } = data;

    const movie = Movie.create({
      name,
      description,
      type,
      director,
      producer,
      country,
      duration,
      thumbnail,
      isShow,
    });

    try {
      const savedMovie = await movie.save();

      images.forEach(async (img) => {
        const image = Image.create({
          url: img,
          movieId: savedMovie.id,
          movie: savedMovie,
        });

        try {
          await image.save();
        } catch (error) {
          console.log(error);
          result = false;
        }
      });
    } catch (error) {
      console.log(error);
      result = false;
    }
    return result;
  };

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthor)
  async deleteMovie(
    @Arg('id', () => Int) id: number
  ) {
    try {
      await Movie.delete({ id });
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  };

  // Sign Up
  // @Mutation(() => UserRespone, { nullable: true })
  // async userSignUp(
  //   @Arg("data") data: SignUpInput,
  //   @Ctx() { req }: MyContext
  // ): Promise<UserRespone> {
  //   const { username, password, fullname } = data;

  //   if (username.length <= 6) return {
  //     errors: { field: 'user', message: 'username must be greater 6' }
  //   }

  //   const hashedPassword = await argon2.hash(password);
  //   const user = User.create({
  //     username, fullname,
  //     role: 3,
  //     password: hashedPassword
  //   });

  //   try {
  //     await user.save();
  //   } catch (error) {
  //     console.log('------------ ERROR ----------------', error);
  //     if (error) return {
  //       errors: { field: 'user', message: 'something went srong' }
  //     }
  //   }

  //   // set cookie when sign up successful
  //   req.session.userId = user.id;

  //   return { user };
  // }
}