import { Arg, Mutation, Resolver, UseMiddleware, Query, Int } from "type-graphql";
import { getConnection } from 'typeorm';

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
    const em = getConnection();
    const { date, location, time, price, movieId, theaterId, id } = data;

    const movie = await Movie.findOne({ id: movieId });
    const theater = await Theater.findOne({ id: theaterId });

    if (!movie || !theater) {
      console.log('---------------- NULL MOVIE || THEATER NOT FOUND ----------------');

      return false;
    }

    let result = true;
    if (id) {
      const scheduleDate = await ScheduleDate.findOne({ date });
      try {
        await ScheduleTime.update({ id }, {
          time,
          price,
          location,
          scheduleDate,
          movie,
          theater,
        });
      } catch (error) {
        console.log('------------- update Time error --------------------', error);
        result = false;
      }
    } else {
      try {
        await em.manager.query(`CALL create_schedule ('${time}', '${date}', ${price}, ${theaterId}, ${movieId}, '${location}')`);
      } catch (error) {
        console.log('------------- proc create schedule error --------------------', error);
        result = false;
      }
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

    if (location) {
      console.log('got location');

      return await ScheduleTime.find({
        where: {
          location, scheduleDateId: scheduleDate?.id,
        },
        relations: ['movie', 'theater'],
      });
    }

    console.log(scheduleDate?.id);

    return await ScheduleTime.find({
      where: {
        scheduleDateId: scheduleDate?.id,
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
    return await Movie.find({ isShow: true })
  }

  @Query(() => [Theater])
  async theaterOptions(
    @Arg('location') location: string
  ) {
    return await Theater.find({ location });
  }
}