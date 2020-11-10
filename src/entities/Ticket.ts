import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

import { Seat } from "./Seat";
import { ScheduleTime } from "./ScheduleTime";
import { Customer } from "./Customer";

@ObjectType()
@Entity()
export class Ticket extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Int)
  @Column()
  price!: number;

  @Field(() => Int)
  @Column()
  seatId: number;

  @ManyToOne(() => Seat, seat => seat.tickets)
  seat: Seat;

  @Field(() => Int)
  @Column()
  scheduleTimeId: number;

  @ManyToOne(() => ScheduleTime, scheduleTime => scheduleTime.tickets)
  scheduleTime: ScheduleTime;

  @Field(() => Int)
  @Column()
  customerId: number;

  @ManyToOne(() => Customer, customer => customer.tickets)
  customer: Customer;

  @Column()
  location: string;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;
}