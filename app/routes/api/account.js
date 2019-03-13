const express = require('express');
const AccountTable = require('../../account/table');
const Session = require('../../account/session');

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
            const session = new Session({ username });
            const sessionStr = session.toString();

            //set a cookie
            res.cookie('sessionStr', sessionStr, {
                expire: Date.now() + 3600000,
                httpOnly: true
                // secure: true //will only be sent over https
            });

            res.json({ message: 'Success!' });
        })
        //this catch also catches any thrown error like on line 20
        .catch(error => next(error));
});

module.exports = router;
