const express = require('express');
const DragonTable = require('../../dragon/table');
const AccountTable = require('../../account/table');
const AccountDragonTable = require('../../accountDragon/table');
const { authenticatedAccount } = require('./helper');
const { getPublicDragons } = require('../../dragon/helper');

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
    const { dragonId, nickname, isPublic, saleValue } = req.body;
    DragonTable.updateDragon({ dragonId, nickname, isPublic, saleValue })
        .then(() => res.json({ message: 'Successfully Updated Dragon' }))
        .catch(err => next(err));
});

router.get('/public-dragons', (req, res, next) => {
    getPublicDragons()
        .then(({ dragons }) => res.json({ dragons }))
        .catch(err => next(err));
});

router.get('/buy', (req, res, next) => {
    const { dragonId, saleValue } = req.body;
    let buyerId;

    DragonTable.getDragon({ dragonId })
        .then(dragon => {
            if (dragon.saleValue !== saleValue) {
                throw new Error('Sale value is not correct');
            }
            if (!dragon.isPublic) {
                throw new Error('Dragon must be public');
            }

            return authenticatedAccount({
                sessionStr: req.cookies.sessionStr
            });
        })
        .then(({ account, authenticated }) => {
            if (!authenticated) throw new Error('Unauthenticated');

            if (saleValue > account.balance) {
                throw new Error('Sale value exceeds balance');
            }

            buyerId = account.id;

            return AccountDragonTable.getDragonAccount({ dragonId });
        })
        .then(({ accountId }) => {
            if (accountId === buyerId)
                throw new Error('Can not buy your own dragon!');

            const sellerId = accountId;

            return Promise.all([
                AccountTable.updateBalance({
                    accountId: buyerId,
                    value: -saleValue
                }),
                AccountTable.updateBalance({
                    accountId: sellerId,
                    value: saleValue
                }),
                AccountDragonTable.updateDragonAccount({
                    dragonId,
                    accountId: buyerId
                }),
                DragonTable.updateDragon({
                    dragonId,
                    isPublic: false
                })
            ]);
        })
        .then(() => res.json({ message: 'Success' }))
        .catch(err => next(err));
});

module.exports = router;
