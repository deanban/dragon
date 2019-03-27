const pool = require('../../pgPool');
const DragonTable = require('./table');
const Dragon = require('./dragon');

const getDragonWithTraits = ({ dragonId }) => {
    return Promise.all([
        DragonTable.getDragon({ dragonId }),
        new Promise((resolve, reject) => {
            pool.query(
                `SELECT "traitType", "traitValue"
          FROM trait
          INNER JOIN dragonTrait ON trait.id=dragonTrait."traitId"
          WHERE dragonTrait."dragonId"=$1`,
                [dragonId],
                (err, res) => {
                    if (err) return reject(err);
                    resolve(res.rows);
                }
            );
        })
    ])
        .then(([dragon, dragonTraits]) => {
            // dragon.dragonId = dragonId;
            // dragon.traits = dragonTraits;
            // return dragon;

            //return a dragon instance instead
            return new Dragon({ ...dragon, dragonId, traits: dragonTraits });
        })
        .catch(err => console.log(err));
};

const getPublicDragons = () => {
    return new Promise((resolve, reject) => {
        pool.query(
            'SELECT id FROM dragon WHERE "isPublic"=TRUE',
            (err, res) => {
                if (err) return reject(err);
                const publicDragons = res.rows;
                Promise.all(
                    publicDragons.map(({ id }) =>
                        getDragonWithTraits({ dragonId: id })
                    )
                )
                    .then(dragons => resolve({ dragons }))
                    .catch(err => reject(err));
            }
        );
    });
};

// getPublicDragons()
//     .then(dragon => console.log(dragon))
//     .catch(err => console.log(err));

module.exports = { getDragonWithTraits, getPublicDragons };
