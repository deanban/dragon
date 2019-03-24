const pool = require('../../pgPool');

class AccountDragonTable {
    static storeAccountDragon({ accountId, dragonId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO accountDragon("accountId", "dragonId") VALUES($1, $2)',
                [accountId, dragonId],
                (err, res) => {
                    if (err) return reject(err);
                    resolve();
                }
            );
        });
    }

    static getAccountDragons({ accountId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                'SELECT "dragonId" FROM accountDragon WHERE "accountId"=$1',
                [accountId],
                (err, res) => {
                    if (err) return reject(err);
                    resolve({ accountDragons: res.rows });
                }
            );
        });
    }
}

// AccountDragonTable.storeAccountDragon({
//     accountId: 1,
//     dragonId: 3
// })
//     .then(() => console.log('store dragon to account'))
//     .catch(err => console.log(err));

// AccountDragonTable.getAccountDragons({
//     accountId: 1
// })
//     .then(({ accountDragons }) => console.log(accountDragons))
//     .catch(err => console.log(err));

module.exports = AccountDragonTable;