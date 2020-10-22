import { Migration } from '@mikro-orm/migrations';

export class Migration20201022065427 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "username" varchar(255) not null, "password" text not null, "create_at" timestamptz(0) not null, "update_at" timestamptz(0) not null);');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
  }

}
