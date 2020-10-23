import { PlaygroundConfig } from "apollo-server-express";
import { reduce } from "lodash";
import glob from 'glob';
import path from 'path';
import fs from 'fs';

const tabs = reduce(
  glob.sync(
    path.resolve(__dirname, './resolvers/**/*.playground.[tj]s')
  ),
  (queryContents: Array<{}>, filePath: string) => {
    if (fs.existsSync(filePath)) {
      const module = path.basename(path.dirname(filePath));
      const query = require(`${filePath}`);
      if (query.default) {
        const tab = {
          name: module,
          endpoint: '/graphql',
          query: query.default,
        };
        queryContents = [...queryContents, tab];
      }
    }
    return queryContents;
  }, []
);

const playground: PlaygroundConfig = {
  endpoint: '/graphql',
  subscriptionEndpoint: '/graphql',
  settings: {
    'request.credentials': 'include',
    'general.betaUpdates': true,
    'editor.cursorShape': 'block',
    'editor.theme': 'dark',
    'editor.reuseHeaders': true,
    'tracing.hideTracingResponse': true,
    'editor.fontSize': 12,
    'editor.fontFamily': '\'Roboto\', \'Consolas\', \'Inconsolata\', \'Droid Sans Mono\', \'Monaco\', monospace',
  },
  tabs,
}

export { playground };