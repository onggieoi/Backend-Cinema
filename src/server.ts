import { MikroORM } from '@mikro-orm/core';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import path from 'path';

import { port } from './config';
import mikroConfig from './mikro-orm.config';
import { playground } from './playground';

(async () => {
  // setup database
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  // setup Express server
  const app: express.Application = express();
  app.use(cors({
    origin: '*',
    credentials: true,
  }));
  app.use(express.json());
  app.use(express.urlencoded());

  // setup Graphql - apollo
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        path.resolve(__dirname, './resolvers/**/*.resolver.ts'),
        path.resolve(__dirname, './resolvers/**.js'),
      ],
      validate: false,
    }),
    playground
  });

  apolloServer.applyMiddleware({ app });

  // Run server
  app.listen(port, () => {
    console.log(`GraphQL Server is now running on port ${port}`);
  });
})().catch(err => console.log(err));
