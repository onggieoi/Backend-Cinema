import { Test } from "./entities/test";

export default {
  entities: [Test],
  dbName: 'cinema',
  type: 'postgresql',
  debug: true,
} as const;
