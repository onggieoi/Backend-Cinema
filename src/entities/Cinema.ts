import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

import { Theater } from "./Theater";

@ObjectType()
@Entity()
export class Cinema extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  address!: string;

  @OneToMany(() => Theater, theater => theater.cinema)
  theaters: Theater[];
}