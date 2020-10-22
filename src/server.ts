import 'reflect-metadata';
// import { MikroORM } from '@mikro-orm/core';
import { createConnection } from 'typeorm';
import express, { Response } from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import path from 'path';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';

import { port, redisConfig, cookieName } from './config';
import DbConnectionOptions from './dbConfig';
import { playground } from './playground';

(async () => {
  // setup database
  // const orm = await MikroORM.init(mikroConfig);
  // await orm.getMigrator().up();

  const conn = await createConnection(DbConnectionOptions);

  // setup Express server
  const app: express.Application = express();
  app.use(cors({
    origin: '*',
    credentials: true,
  }));
  app.use(express.json());
  app.use(express.urlencoded());

  // setup Redis session
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  app.use(
    session({
      name: cookieName,
      store: new RedisStore({
        host: redisConfig.host,
        port: redisConfig.port,
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,        // a day
        httpOnly: true,
        secure: false,                      // true to work only in https
        sameSite: 'lax',                    // csrf
      },
      saveUninitialized: false,
      secret: redisConfig.secretSession,
      resave: false,
    })
  );

  // setup Graphql - apollo
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        path.resolve(__dirname, './resolvers/**/*.resolver.ts'),
        path.resolve(__dirname, './resolvers/**/*.resolver.js'),
      ],
      validate: false,
    }),
    playground,
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app });

  // Run server
  app.listen(port, () => {
    console.log(`GraphQL Server is now running on port ${port}`);
  });

  app.use('/', (_, res: Response) => res.send(`
  Graphql Server ran successful !!!<br/> 
  Click here to<a href='http://localhost:${port}/graphql' target='_blank'>read graphql document</a>
  `));

})().catch(err => console.log(err));
