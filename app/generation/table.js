const pool = require('../../pgPool');

class GenerationTable {
  //making it static because I don't need to instantialize the class.
  static storeGeneration(generation) {
    // need a promise because I need to return from inside the callback function.
    return new Promise((resolve, reject) => {
      // values come from the postgres arr which is 1 indexed instead of
      // zero indexed. Hence, $1.
      pool.query(
        'INSERT INTO generation(expiration) VALUES($1) RETURNING id',
        [generation.expiration],
        (err, res) => {
          if (err) reject(err);

          const generationId = res.rows[0].id;

          resolve({ generationId });
        }
      );
    });
  }
}

module.exports = GenerationTable;
