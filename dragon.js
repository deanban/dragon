const TRAITS = require('./traits.json');

const DRAGON_OBJ_DEFAULTS = {};

Object.defineProperties(DRAGON_OBJ_DEFAULTS, {
  birthday: { get: () => new Date().toLocaleString() },
  nickname: { get: () => 'unnamed' },
  traits: {
    //get random traits if none are provided
    get: () => {
      const traitsArr = [];

      TRAITS.forEach(TRAITS => {
        const traitType = TRAITS.type;
        const traitVals = TRAITS.values;

        const randomTraitValue =
          traitVals[Math.floor(Math.random() * traitVals.length)];

        traitsArr.push({ traitType, randomTraitValue });
      });

      return traitsArr;
    }
  }
});

class Dragon {
  constructor({ birthday, nickname, traits } = {}) {
    this.birthday = birthday || DRAGON_OBJ_DEFAULTS.birthday;
    this.nickname = nickname || DRAGON_OBJ_DEFAULTS.nickname;
    this.traits = traits || DRAGON_OBJ_DEFAULTS.traits;
  }
}

module.exports = Dragon;
