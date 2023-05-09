const { Pool, types } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

types.setTypeParser(types.builtins.INT8, (value) => parseInt(value));
types.setTypeParser(20, BigInt);
types.setTypeParser(types.builtins.FLOAT8, (value) => parseFloat(value));
types.setTypeParser(types.builtins.NUMERIC, (value) => parseFloat(value));
types.setTypeParser(types.builtins.DATE, (value) => new Date(value).toISOString());

// Load all environment variables from .env file
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: parseInt(process.env.PGPORT, 10),
    ssl: {
        sslmode: process.env.PGSSLMODE,
        rejectUnauthorized: process.env.DB_REJECT_UNAUTHORIZED === 'true'
    }
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err.stack);
    process.exit(-1);
});

pool.on('connect', () => {
    console.log('Connected to database successfully!');
});

module.exports = {
    query: async (queryObj) => {
        let client;

        try {
            // Fetch a connection from connection pool
            client = await pool.connect();

            return await client.query(queryObj);
        } catch (err) {
            console.log('Database error: ', err.message);
            throw err;
        } finally {
            // Release the conenction back to the connection pool
            client.release();
        }
    }
};
