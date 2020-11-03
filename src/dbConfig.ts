import path from "path";
import { ConnectionOptions } from "typeorm";

import { dbConfig } from './config';

export default {
  type: 'postgres',
  host: dbConfig.host,
  database: dbConfig.dbName,
  username: dbConfig.dbUser,
  password: dbConfig.dbPasword,
  port: dbConfig.dbPort,
  logging: true,
  synchronize: true,
  entities: [path.resolve(__dirname, './entities/*.[tj]s')]
} as ConnectionOptions;