const express = require('express');
const DragonTable = require('../../dragon/table');
const AccountDragonTable = require('../../accountDragon/table');
const { authenticatedAccount } = require('./helper');

const router = express.Router();

router.get('/new', (req, res, next) => {
    let accountId, dragon;

    authenticatedAccount({ sessionStr: req.cookies.sessionStr })
        .then(({ account }) => {
            accountId = account.id;
            dragon = req.app.locals.Engine.generation.newDragon();
            return DragonTable.storeDragon(dragon);
        })
        .then(({ dragonId }) => {
            // console.log('dragonId', dragonId);
            dragon.dragonId = dragonId;
            return AccountDragonTable.storeAccountDragon({
                accountId,
                dragonId
            });
        })
        .then(() => res.json({ dragon }))
        .catch(err => next(err));
});

router.put('/update', (req, res, next) => {
    const { dragonId, nickname } = req.body;
    DragonTable.updateDragon({ dragonId, nickname })
        .then(() => res.json({ message: 'Successfully Updated Dragon' }))
        .catch(err => next(err));
});

module.exports = router;
