import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Test {
  @PrimaryKey()
  id!: number;

  @Property()
  createAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updateAt = new Date();

  @Property()
  title!: string;
}