const pool = require('../../pgPool');
const DragonTraitTable = require('../dragonTraits/table');

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

                    //storeDragonTrait is asynchronous
                    //so storeDragonTrait should wait to resolve
                    //dragonId until ALL dragonTraits have been stored.
                    //storeDragonTrait returns a promise for every trait
                    //so I can create an array of promises and wait until
                    //each promise in the array is resolved
                    //before resolving dragonId
                    //I can use map on traits and return all the promises
                    //as an array.
                    //then return an overall promise that will wrap around the
                    //array of promises from map.

                    //overall promise
                    Promise.all(
                        dragon.traits.map(({ traitType, traitValue }) => {
                            //return promise array
                            return DragonTraitTable.storeDragonTrait({
                                dragonId,
                                traitType,
                                traitValue
                            });
                        })
                    )
                        .then(() => resolve({ dragonId }))
                        .catch(err => reject(err));
                }
            );
        });
    }

    static getDragon({ dragonId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT birthday, nickname, "generationId"
                FROM dragon
                WHERE dragon.id=$1`,
                [dragonId],
                (err, res) => {
                    if (err) return reject(err);

                    if (res.rows.length === 0)
                        return reject(new Error('No Dragon'));
                    resolve(res.rows[0]);
                }
            );
        });
    }
}

// DragonTable.getDragon({ dragonId: 1 })
//     .then(dragon => console.log(dragon))
//     .catch(err => console.log(err));

module.exports = DragonTable;
