const express = require('express');
const bcrypt = require('bcrypt');
const AccountTable = require('../../account/table');

const { setSession } = require('./helper');

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
            console.log(password);
            console.log(account.password);
            console.log(bcrypt.compareSync(password, account.password));
            if (account && bcrypt.compareSync(password, account.password)) {
                return setSession({ username, res });
            } else {
                const error = new Error('Incorrect username/password');
                error.statusCode = 409;
                throw error;
            }
        })
        .then(({ message }) => {
            res.json({ message });
        })
        .catch(err => next(err));
});

module.exports = router;
