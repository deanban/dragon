const bcrypt = require('bcrypt');
const pool = require('../../pgPool');

class AccountTable {
    static storeAccount({ username, password }) {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) return reject(err);
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) return reject(err);
                    password = hash;
                    pool.query(
                        'INSERT INTO account(username, password) values($1,$2)',
                        [username, password],
                        (err, res) => {
                            if (err) return reject(err);
                            resolve();
                        }
                    );
                });
            });
        });
    }
}

module.exports = AccountTable;
