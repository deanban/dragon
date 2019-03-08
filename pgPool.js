const { Pool } = require('pg');
const dotenv = require('dotenv');

const ENV_VARS = dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_DEV_HOST,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

if (ENV_VARS.error) {
    throw ENV_VARS.error;
}

module.exports = pool;

// pool.query('SELECT * FROM generation', (err, res) => {
//   if (err) throw err;
//   console.log('response.rows', res.rows);
// });
