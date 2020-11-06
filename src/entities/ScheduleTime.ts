import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

import { Theater } from "./Theater";
import { ScheduleDate } from "./ScheduleDate";
import { Ticket } from "./Ticket";
import { Movie } from "./Movie";

@ObjectType()
@Entity()
export class ScheduleTime extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  time!: string;

  @Field(() => Int)
  @Column()
  price: number;

  @OneToMany(() => Ticket, ticket => ticket.scheduleTime)
  tickets: Ticket[];

  @Field(() => Int)
  @Column()
  theaterId: number;

  @Field(() => Theater, { nullable: true })
  @ManyToOne(() => Theater, theater => theater.scheduleTimes)
  theater: Theater;

  @Field(() => Int)
  @Column()
  scheduleDateId: number;

  @Field(() => ScheduleDate)
  @ManyToOne(() => ScheduleDate, scheduleDate => scheduleDate.scheduleTimes)
  scheduleDate: ScheduleDate;

  @Field(() => Int)
  @Column()
  movieId: number;

  @Field(() => Movie, { nullable: true })
  @ManyToOne(() => Movie, movie => movie.scheduleTimes)
  movie: Movie;

  @Field()
  @Column()
  location: string;
}