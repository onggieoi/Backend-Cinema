require('dotenv').config();

export const port = parseInt(`${process.env.SERVER_PORT || 5000}`, 10);
export const dbConfig = {
  host: process.env.DATABASE_HOST || '',
  dbName: process.env.DATABASE_NAME || '',
  dbPort: Number(`${process.env.DATABASE_PORT}` || 5432),
  dbUser: process.env.DATABASE_USER || '',
  dbPasword: process.env.DATABASE_PASSWORD || '',
};

export const redisConfig = {
  host: process.env.HOST_REDIS || '',
  port: Number(`${process.env.PORT_REDIS}`) || 6379,
  secretSession: process.env.SECRET_SESSION_REDIS || '',
};

export const cookieName = 'qid';