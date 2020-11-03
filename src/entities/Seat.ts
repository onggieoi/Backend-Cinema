import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

import { Theater } from "./Theater";
import { Ticket } from "./Ticket";

@ObjectType()
@Entity()
export class Seat extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  description!: string;

  @Field(() => Int)
  @Column()
  percent!: number;

  @Field()
  @Column()
  theaterId: number;

  @ManyToOne(() => Theater, theater => theater.seats)
  theater: Theater;

  @OneToMany(() => Ticket, ticket => ticket.seat)
  tickets: Ticket[];

  @Column()
  location: string;
}