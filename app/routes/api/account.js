const express = require('express');
const AccountTable = require('../../account/table');

const router = express.Router();

router.post('/signup', (req, res, next) => {
    const { username, password } = req.body;

    AccountTable.storeAccount({ username, password })
        .then(() => res.json({ message: 'Success!' }))
        .catch(err => next(err));
});

module.exports = router;
