import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import { MikroORM } from '@mikro-orm/core';

import { port } from './config';

class Server {
  private App: express.Application;

  constructor() {
    this.App = express();
  };

  async graphQl() {
    this.App.use(cors({
      origin: '*',
      credentials: true,
    }));
    this.App.use(express.json());
    this.App.use(express.urlencoded());
    this.App.use('/graphql', graphqlHTTP((request: any, response: any) => (
      // 
    )));
  };

  async Start() {
    await this.graphQl();
    this.App.listen(port, () => {
      console.log(`GraphQL Server is now running on port ${port}`);
    });
  };
}

new Server().Start();
