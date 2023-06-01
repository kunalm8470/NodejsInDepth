const dotenv = require('dotenv');
const path = require('path');

// Load all environment variables from .env file
dotenv.config({ path: path.join(__dirname, '..', '.env') });

module.exports = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,

  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        sslmode: process.env.DB_PGSSLMODE,
        rejectUnauthorized: process.env.DB_REJECT_UNAUTHORIZED === 'true'
      }
    }
  },

  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        sslmode: process.env.DB_PGSSLMODE,
        rejectUnauthorized: process.env.DB_REJECT_UNAUTHORIZED === 'true'
      }
    }
  },
  
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        sslmode: process.env.DB_PGSSLMODE,
        rejectUnauthorized: process.env.DB_REJECT_UNAUTHORIZED === 'true'
      }
    }
  }
};
