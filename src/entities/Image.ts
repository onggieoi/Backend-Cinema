import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

import { Movie } from "./Movie";

@ObjectType()
@Entity()
export class Image extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  image: string;

  @Field(() => Int)
  @Column()
  movieId: number;

  @ManyToOne(() => Movie, movie => movie.images)
  movie: Movie;
}