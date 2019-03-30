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

    static getDragonAccount({ dragonId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                'SELECT "accountId" FROM accountDragon WHERE "dragonId"=$1',
                [dragonId],
                (err, res) => {
                    if (err) return reject(err);
                    resolve({ accountId: res.rows[0].accountId });
                }
            );
        });
    }

    static updateDragonAccount({ dragonId, accountId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `UPDATE accountDragon SET "accountId"=$1
                 WHERE "dragonId"=$2`,
                [accountId, dragonId],
                (err, res) => {
                    if (err) return reject(err);
                    resolve();
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
// AccountDragonTable.getDragonAccount({
//     dragonId: 1
// })
//     .then(({ accountId }) => console.log(accountId))
//     .catch(err => console.log(err));

// AccountDragonTable.updateDragonAccount({
//     dragonId: 1,
//     accountId: 1
// })
//     .then(() => console.log('success'))
//     .catch(err => console.log(err));

module.exports = AccountDragonTable;
