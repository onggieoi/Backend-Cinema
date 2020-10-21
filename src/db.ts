import { MikroORM } from '@mikro-orm/core';

import mikroConfig from './mikro-orm.config';

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
};
