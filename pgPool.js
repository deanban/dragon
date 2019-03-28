const { Pool } = require('pg');
const dotenv = require('dotenv');

const ENV_VARS = dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

if (ENV_VARS.error) {
    throw ENV_VARS.error;
}

module.exports = pool;

// pool.query('SELECT * FROM generation', (err, res) => {
//   if (err) throw err;
//   console.log('response.rows', res.rows);
// });
