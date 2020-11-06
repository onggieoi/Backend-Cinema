import { Arg, Mutation, Resolver, UseMiddleware, Query, Int } from "type-graphql";

import { isAuthor } from "../../middleware/isAuthenticated";
import { CreateScheduleInput, QuerySchedulesInput, ScheduleRespone } from "./Types";

import { ScheduleDate } from "../../entities/ScheduleDate";
import { ScheduleTime } from "../../entities/ScheduleTime";
import { Movie } from "../../entities/Movie";
import { Theater } from "../../entities/Theater";

@Resolver()
export class SheduleResolver {
  // Create Schedule
  @Mutation(() => Boolean)
  @UseMiddleware(isAuthor)
  async createSchedule(
    @Arg("data") data: CreateScheduleInput
  ) {
    const { date, location, time, price, movieId, theaterId } = data;
    let result = true;

    let scheduleDate = await ScheduleDate.findOne({ date, location });

    if (!scheduleDate) {
      scheduleDate = ScheduleDate.create({ date, location });
      try {
        await scheduleDate.save();
      } catch (error) {
        console.log('------------- new Date Error --------------------', error);
        result = false
      }
    }

    const movie = await Movie.findOne({ id: movieId });
    const theater = await Theater.findOne({ id: theaterId });

    if (!movie || !theater) {
      console.log('---------------- NULL MOVIE || THEATER ----------------');

      return false;
    }


    const scheduleTime = ScheduleTime.create({
      time,
      price,
      location,
      scheduleDateId: scheduleDate.id,
      scheduleDate,
      movie,
      movieId: movie.id,
      theater,
      theaterId: theater.id,
    });

    try {
      await scheduleTime.save();
    } catch (error) {
      console.log('------------- save Time --------------------', error);
      result = false;
    }

    return result;
  }

  @Query(() => [ScheduleTime])
  @UseMiddleware(isAuthor)
  async ListSchedules(
    @Arg('data') data: QuerySchedulesInput
  ) {
    const { location, date } = data;
    const scheduleDate = await ScheduleDate.findOne({ date });

    if (!location) {
      return await ScheduleTime.find({
        where: {
          scheduleDateId: scheduleDate?.id,
        },
        relations: ['movie', 'theater'],
      });
    }

    return await ScheduleTime.find({
      where: {
        location, scheduleDateId: scheduleDate?.id,
      },
      relations: ['movie', 'theater'],
    });
  }

  @Query(() => ScheduleRespone, { nullable: true })
  @UseMiddleware(isAuthor)
  async schedule(
    @Arg('id', () => Int) id: number
  ) {
    const schedule = await ScheduleTime.findOne({
      where: { id },
      relations: ['theater', 'movie', 'scheduleDate']
    });

    if (!schedule) {
      return { error: true };

    }
    return { schedule };
  }

  @Query(() => [Movie])
  async moviesOption() {
    return await Movie.find({ isShow: false })
  }

  @Query(() => [Theater])
  async theaterOptions(
    @Arg('location') location: string
  ) {
    return await Theater.find({ location });
  }
}