// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' }
  },

  staging: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' }
  },

  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' }
  }

};
