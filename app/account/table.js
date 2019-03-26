const bcrypt = require('bcrypt');
const pool = require('../../pgPool');
const { STARTING_BALANCE } = require('../config');

class AccountTable {
    static storeAccount({ username, password }) {
        return new Promise((resolve, reject) => {
            console.log('AccountTable password', password);
            const hash = bcrypt.hashSync(password, 10);
            // password = hash;
            pool.query(
                `INSERT INTO
                account(username, password, balance)
                VALUES($1,$2,$3)`,
                [username, hash, STARTING_BALANCE],
                (err, res) => {
                    if (err) return reject(err);
                    resolve();
                }
            );
        });
    }

    static getAccount({ username }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT id, password, "sessionId", balance FROM account
                 WHERE username=$1`,
                [username],
                (err, res) => {
                    if (err) return reject(err);
                    resolve({ account: res.rows[0] });
                }
            );
        });
    }

    static updateSessionId({ sessionId, username }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `UPDATE account SET "sessionId"=$1
                 WHERE username=$2`,
                [sessionId, username],
                (err, res) => {
                    if (err) return reject(err);
                    resolve();
                }
            );
        });
    }
}

module.exports = AccountTable;
