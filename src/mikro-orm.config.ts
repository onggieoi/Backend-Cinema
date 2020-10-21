import { MikroORM } from "@mikro-orm/core";
import path from 'path';

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: ['./src/entities'],
  dbName: 'test',
  type: 'postgresql',
  user: 'onggieoi',
  password: 'onggieoi@123',
  port: 5832,
  debug: true,
} as Parameters<typeof MikroORM.init>[0];
