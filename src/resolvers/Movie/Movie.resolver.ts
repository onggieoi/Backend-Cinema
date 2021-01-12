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
    const { id, name, description, type, director, producer, country, duration, thumbnail, isShow, images } = data;

    let result = true;
    let movie = new Movie;

    if (id) {
      await Movie.update({ id }, { name, description, type, director, producer, country, duration, thumbnail, isShow });

      movie = await Movie.findOne({ id }) || new Movie;
    } else {
      movie = Movie.create({ name, description, type, director, producer, country, duration, thumbnail, isShow });
    }

    try {
      const savedMovie = await movie.save();

      await Image.delete({ movieId: savedMovie.id });

      images?.forEach(async (img) => {
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
      await Image.delete({ movieId: id });
    } catch (error) {
      console.log(error);
      return false;
    }

    try {
      await Movie.delete({ id });
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  };
}