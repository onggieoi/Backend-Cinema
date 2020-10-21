require('dotenv').config();

export const port = parseInt(`${process.env.SERVER_PORT || 5000}`, 10);
