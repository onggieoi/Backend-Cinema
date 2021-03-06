import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

import { ScheduleTime } from "./ScheduleTime";
import { Image } from './Image';

@ObjectType()
@Entity()
export class Movie extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column({ type: 'text' })
  description!: string;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  director: string;

  @Field()
  @Column()
  producer: string;

  @Field()
  @Column()
  country: string;

  @Field(() => Int)
  @Column()
  duration: number;

  @Field()
  @Column({ type: 'text' })
  thumbnail: string;

  @Field()
  @Column()
  isShow: boolean;

  @OneToMany(() => ScheduleTime, scheduleTime => scheduleTime.movie)
  scheduleTimes: ScheduleTime[];

  @Field(() => [Image], { nullable: true })
  @OneToMany(() => Image, image => image.movie)
  images?: Image[];
}