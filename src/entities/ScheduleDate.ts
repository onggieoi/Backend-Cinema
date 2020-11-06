import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

import { ScheduleTime } from "./ScheduleTime";

@ObjectType()
@Entity()
export class ScheduleDate extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  date!: string;

  @OneToMany(() => ScheduleTime, schedule => schedule.scheduleDate)
  scheduleTimes: ScheduleTime[];

  @Column()
  location: string;
}