import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Test {
  @PrimaryKey()
  id!: number;

  @Property({ type: 'date' })
  createAt = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updateAt = new Date();

  @Property()
  title!: string;
}