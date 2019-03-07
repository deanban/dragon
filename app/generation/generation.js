const { REFRESH_RATE, SECONDS } = require('../config');
const Dragon = require('../dragon');

class Generation {
  constructor() {
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

  newDragon({ birthday, nickname, traits } = {}) {
    if (Date.now() > this.expiration) {
      throw new Error(`This dragon expired on ${this.expiration}`);
    }
    return new Dragon({ birthday, nickname, traits });
  }
}

module.exports = Generation;
