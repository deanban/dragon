const TRAITS = require('../../data/traits.json');

const DRAGON_OBJ_DEFAULTS = {};

Object.defineProperties(DRAGON_OBJ_DEFAULTS, {
    birthday: { get: () => new Date().toLocaleString() },
    nickname: { get: () => 'unnamed' },
    generationId: { get: () => undefined },
    traits: {
        //get random traits if none are provided
        get: () => {
            const traitsArr = [];

            TRAITS.forEach(TRAITS => {
                const traitType = TRAITS.type;
                const traitVals = TRAITS.values;

                const traitValue =
                    traitVals[Math.floor(Math.random() * traitVals.length)];

                traitsArr.push({ traitType, traitValue });
            });

            return traitsArr;
        }
    }
});

class Dragon {
    constructor({ birthday, nickname, generationId, traits } = {}) {
        this.birthday = birthday || DRAGON_OBJ_DEFAULTS.birthday;
        this.nickname = nickname || DRAGON_OBJ_DEFAULTS.nickname;
        this.traits = traits || DRAGON_OBJ_DEFAULTS.traits;
        this.generationId = generationId || DRAGON_OBJ_DEFAULTS.generationId;
    }
}

module.exports = Dragon;
