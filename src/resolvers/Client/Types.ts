import { ObjectType, Field, InputType, Int } from "type-graphql";

import { Movie } from "../../entities/Movie";
import { ErrorType } from "../ErrorType";
import { Seat } from "../../entities/Seat";

@InputType()
export class InputGetTime {
  @Field(() => Int, { nullable: true })
  movieId?: number;

  @Field(() => String, { nullable: true })
  location?: string;

  @Field(() => String, { nullable: true })
  date?: string;
}

@InputType()
export class InputGetSeat {
  @Field(() => Int, { nullable: true })
  scheduleTimeId?: number;

  @Field(() => Int, { nullable: true })
  theaterId?: number;

  @Field(() => String, { nullable: true })
  location?: string;
}

@InputType()
export class BuyTicketInput {
  @Field(() => Int)
  scheduleTimeId?: number;

  @Field(() => Int)
  seatId?: number;

  @Field(() => Int)
  price?: number;

  @Field(() => String)
  location?: string;
}

// -------------------------------------------------------------------------------------

@ObjectType()
export class ResponeMoviesHome {
  @Field(() => [Movie])
  moviesShowing: Movie[];

  @Field(() => [Movie])
  moviesComming: Movie[];
}

@ObjectType()
export class ResponeMovie {
  @Field(() => Movie, { nullable: true })
  movie?: Movie;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class SeatRespone {
  @Field(() => Seat, { nullable: true })
  seat?: Seat;

  @Field(() => Boolean, { nullable: true })
  isAvailable: boolean;
}