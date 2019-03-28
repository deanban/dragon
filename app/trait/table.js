const pool = require('../../pgPool');

class TraitTable {
    static getTraitId({ traitType, traitValue }) {
        return new Promise((resolve, reject) => {
            pool.query(
                'SELECT id FROM trait WHERE "traitType"=$1 AND "traitValue"=$2',
                [traitType, traitValue],
                (err, res) => {
                    if (err) return reject(err);
                    resolve({ traitId: res.rows[0].id });
                }
            );
        });
    }
}

TraitTable.getTraitId({ traitType: 'backgroundColor', traitValue: 'blue' })
    .then(({ traitId }) => console.log('traitId', traitId))
    .catch(err => console.log(err));

module.exports = TraitTable;
