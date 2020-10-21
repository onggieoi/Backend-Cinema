require('dotenv').config();

export const port = parseInt(`${process.env.GRAPHQL_PORT || 3000}`, 10);
