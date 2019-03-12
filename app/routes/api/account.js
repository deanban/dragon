const express = require('express');
const AccountTable = require('../../account/table');

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
        //which has been chained instead of using .then()
        //after storeAccount() call.
        .then(() => res.json({ message: 'Success!' }))
        //this catch also ctched any thrown error like on line 19
        .catch(error => next(error));
});

module.exports = router;
