import { MikroORM } from "@mikro-orm/core";
import path from 'path';
import { ConnectionOptions } from "typeorm";

import { dbConfig } from './config';

// export default {
//   migrations: {
//     path: path.join(__dirname, './migrations'),
//     pattern: /^[\w-]+\d+\.[tj]s$/,
//   },
//   entities: ['./src/entities'],
//   type: 'postgresql',
//   dbName: dbConfig.dbName,
//   host: dbConfig.host,
//   user: dbConfig.dbUser,
//   password: dbConfig.dbPasword,
//   port: dbConfig.dbPort,
//   debug: true,
// } as  Parameters<typeof MikroORM.init>[0];

export default {
  type: 'postgres',
  host: dbConfig.host,
  database: dbConfig.dbName,
  username: dbConfig.dbUser,
  password: dbConfig.dbPasword,
  logging: true,
  synchronize: true,
  entities: ['./src/entities'],
} as ConnectionOptions;