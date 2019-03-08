const pool = require('../../pgPool');

class DragonTable {
    //making it static because I don't need to instantialize the class.
    static storeDragon(dragon) {
        const { birthday, nickname, generationId } = dragon;
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO dragon(birthday, nickname, "generationId")
         VALUES($1, $2, $3) RETURNING id`,
                [birthday, nickname, generationId],
                (err, res) => {
                    if (err) return reject(err);

                    const dragonId = res.rows[0].id;
                    resolve({ dragonId });
                }
            );
        });
    }
}

module.exports = DragonTable;
