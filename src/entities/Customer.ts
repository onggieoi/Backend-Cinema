import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

import { Ticket } from "./Ticket";

@ObjectType()
@Entity()
export class Customer extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Int)
  @Column()
  csv!: number;

  @Field(() => Int)
  @Column()
  creditCardNumber!: number;

  @Field()
  @Column()
  username!: string;

  @Column({ type: 'text' })
  password!: string;

  @Field()
  @Column()
  fullname: string;

  @OneToMany(() => Ticket, ticket => ticket.customer)
  tickets: Ticket[];
}