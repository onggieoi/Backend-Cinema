import { Migration } from '@mikro-orm/migrations';

export class Migration20201021140024 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "test" ("id" serial primary key, "create_at" timestamptz(0) not null, "update_at" timestamptz(0) not null, "title" varchar(255) not null);');
  }
}
