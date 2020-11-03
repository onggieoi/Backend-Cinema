import { Query, Resolver, Arg, Mutation, Int, UseMiddleware, Ctx } from "type-graphql";

import { ResponeMoviesHome, ResponeMovie, InputGetTime, InputGetSeat, SeatRespone, BuyTicketInput } from "./Types";
import { Movie } from "../../entities/Movie";
import { ScheduleTime } from "../../entities/ScheduleTime";
import { ScheduleDate } from "../../entities/ScheduleDate";
import { Cinema } from "../../entities/Cinema";
import { isAuth } from "../../middleware/isAuthenticated";
import { Seat } from "../../entities/Seat";
import { Ticket } from "../../entities/Ticket";
import { MyContext } from "../../types";

@Resolver()
export class ClientResolver {
  // Movies for home pages
  @Query(() => ResponeMoviesHome)
  async moviesForHome(): Promise<ResponeMoviesHome> {
    const moviesShowing = await Movie.find({
      order: { id: -1 },
      take: 6,
      where: {
        isShow: true,
      }
    });

    const moviesComming = await Movie.find({
      order: { id: -1 },
      take: 6,
      where: {
        isShow: false,
      }
    });

    return { moviesShowing, moviesComming };
  }

  @Query(() => [Cinema])
  async cinemas(): Promise<Cinema[]> {
    return await Cinema.find({ order: { id: 1 } });
  }

  // movies are showing
  @Query(() => [Movie])
  async moviesShowing(): Promise<Movie[]> {
    return await Movie.find({ where: { isShow: true } });
  }

  // movies are comming
  @Query(() => [Movie])
  async moviesComming(): Promise<Movie[]> {
    return await Movie.find({ where: { isShow: false } });
  }

  // specific movie
  @Query(() => ResponeMovie)
  async movie(
    @Arg('id', () => Int) id: number
  ): Promise<ResponeMovie> {

    const movie = await Movie.findOne({ id }, {
      relations: ['images']
    })

    if (movie) return { movie };

    return {
      error: {
        field: 'id',
        message: 'movie is not found'
      }
    }
  }

  // get times session
  @Query(() => [ScheduleTime])
  async getTimesSession(
    @Arg('options') options: InputGetTime
  ): Promise<ScheduleTime[]> {
    const { location, movieId, date } = options;
    const scheduleDate = await ScheduleDate.findOne({ date });

    return await ScheduleTime.find({
      relations: ['theater'],
      where: {
        location,
        movieId,
        scheduleDateId: scheduleDate?.id
      }
    });
  }

  // get seat
  @Query(() => [SeatRespone])
  @UseMiddleware(isAuth)
  async seats(
    @Arg('options') option: InputGetSeat
  ) {
    const seats = await Seat.find({
      where: {
        theaterId: option.theaterId,
        location: option.location,
      }
    });

    return seats.map(async (seat) => ({
      seat,
      isAvailable: !!(await Ticket.findOne({
        scheduleTimeId: option.scheduleTimeId,
        seatId: seat.id,
        location: option.location,
      })),
    }));;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async buyTicket(
    @Ctx() { req }: MyContext,
    @Arg('options') option: BuyTicketInput
  ): Promise<boolean> {
    const { price, seatId, scheduleTimeId, location } = option;
    const customerId = req.session.userId;

    const ticket = Ticket.create({
      price, seatId, scheduleTimeId, location, customerId
    });

    try {
      await ticket.save();
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }
}