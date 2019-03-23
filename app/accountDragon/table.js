const pool = require('../../pgPool');

class AccountDragonTable {
    static storeAccountDragon({ accountId, dragonId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO accountDragon("accountId", "dragonId") VALUES($1, $2)',
                [accountId, dragonId],
                (err, res) => {
                    if (err) reject(err);
                    resolve();
                }
            );
        });
    }
}

AccountDragonTable.storeAccountDragon({
    accountId: 1,
    dragonId: 3
})
    .then(() => console.log('store dragon to account'))
    .catch(err => console.log(err));

module.exports = AccountDragonTable;
