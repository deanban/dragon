const express = require('express');
const bcrypt = require('bcrypt');
const AccountTable = require('../../account/table');
const AccountDragonTable = require('../../accountDragon/table');
const Session = require('../../account/session');

const { setSession, authenticatedAccount } = require('./helper');
const { getDragonWithTraits } = require('../../dragon/helper');

const router = express.Router();

router.post('/signup', (req, res, next) => {
    const { username, password } = req.body;

    AccountTable.getAccount({ username })
        .then(({ account }) => {
            if (!account) {
                return AccountTable.storeAccount({ username, password });
            } else {
                const error = new Error(
                    'This user name has already been taken.'
                );
                error.statusCode = 409;
                // next(error) can be delegated to the next catch handler by throwing error
                throw error;
            }
        })
        //this .then() is the returned promise from storeAccount call
        //which has ben chained instead of using .then()
        //after storeAccount() call.
        .then(() => {
            //queries are asyncronous.
            //So setSession need to return a promise
            //otherwise it would go to next line while setSession
            //is running

            //returning setSession to use another .then() handler
            return setSession({ username, res });
        })
        .then(({ message }) => {
            res.json({ message });
        })
        //this catch also catches any thrown error like on line 20
        .catch(error => next(error));
});

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    AccountTable.getAccount({ username })
        .then(({ account }) => {
            if (
                account &&
                bcrypt.compareSync(password, account.password.trim())
            ) {
                const { sessionId } = account;
                // res.json({ account });
                return setSession({ username, res, sessionId });
            } else {
                const error = new Error(
                    'Account does not exits or incorrect password'
                );
                error.statusCode = 409;
                throw error;
            }
        })
        .then(message => {
            res.json(message);
        })
        .catch(err => next(err));
});

router.get('/logout', (req, res, next) => {
    const { username } = Session.parse(req.cookies.sessionStr);
    console.log(req.cookies);
    AccountTable.updateSessionId({ sessionId: null, username })
        .then(() => {
            res.clearCookie('sessionStr');
            res.json({ message: 'Logout Successful' });
        })
        .catch(err => next(err));
});

router.get('/authenticated', (req, res, next) => {
    const { sessionStr } = req.cookies;

    authenticatedAccount({ sessionStr })
        .then(({ authenticated }) => {
            res.json({ authenticated });
        })
        .catch(err => next(err));
});

router.get('/dragons', (req, res, next) => {
    authenticatedAccount({ sessionStr: req.cookies.sessionStr })
        .then(({ account }) => {
            // res.json({ authenticated });
            return AccountDragonTable.getAccountDragons({
                accountId: account.id
            });
        })
        .then(({ accountDragons }) => {
            return Promise.all(
                accountDragons.map(accountDragon => {
                    return getDragonWithTraits({
                        dragonId: accountDragon.dragonId
                    });
                })
            );
        })
        .then(dragons => {
            res.json({ dragons });
        })
        .catch(err => next(err));
});

module.exports = router;
