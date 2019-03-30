const { REFRESH_RATE, SECONDS } = require('../config');
const Dragon = require('../dragon/dragon');

class Generation {
    constructor() {
        this.accountIds = new Set(); //set with unique ids
        this.expiration = this.calculateDragonExpiration();

        //generationId will get updated in the engine file
        this.generationId = undefined;
    }

    calculateDragonExpiration() {
        const refreshRate = REFRESH_RATE * SECONDS;

        const expirationPeriod = Math.floor(Math.random() * (refreshRate / 2));

        const msUntilExpiration =
            Math.random() < 0.5
                ? refreshRate - expirationPeriod
                : refreshRate + expirationPeriod;

        return new Date(Date.now() + msUntilExpiration);
    }

    newDragon({
        accountId,
        birthday,
        nickname,
        generationId = this.generationId,
        traits
    } = {}) {
        if (Date.now() > this.expiration) {
            throw new Error(`This dragon expired on ${this.expiration}`);
        }
        if (this.accountIds.has(accountId))
            throw new Error('You already have a dragon from this generation.');

        this.accountIds.add(accountId);

        return new Dragon({ birthday, nickname, generationId, traits });
    }
}

module.exports = Generation;
