import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, ManyToOne } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { Cinema } from "./Cinema";
import { Seat } from "./Seat";
import { ScheduleTime } from "./ScheduleTime";

@ObjectType()
@Entity()
export class Theater extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  description!: string;

  @Field()
  @Column()
  cinemaId: number;

  @ManyToOne(() => Cinema, cinema => cinema.theaters)
  cinema: Cinema;

  @OneToMany(() => Seat, seat => seat.theater)
  seats: Seat[];

  @OneToMany(() => ScheduleTime, scheduleTime => scheduleTime.theater)
  scheduleTimes: ScheduleTime[];

  @Column()
  location: string;
}