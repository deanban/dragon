const fs = require('fs');
const TRAITS = require('../../data/traits.json');

const DRAGON_OBJ_DEFAULTS = {};

Object.defineProperties(DRAGON_OBJ_DEFAULTS, {
    dragonId: { get: () => undefined },
    birthday: { get: () => new Date().toLocaleString() },
    nickname: {
        //assign  random names
        get: () => {
            let nameArr = fs
                .readFileSync('data/dragon_names.txt')
                .toString('utf-8')
                .split('\n')
                .filter(names => names !== '');

            return nameArr[
                Math.floor(Math.random() * nameArr.length)
            ].toString();
        }
    },
    generationId: { get: () => undefined },
    isPublic: { get: () => false },
    saleValue: { get: () => 0 },
    traits: {
        //assign random traits
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
    constructor({
        dragonId,
        birthday,
        nickname,
        generationId,
        isPublic,
        saleValue,
        traits
    } = {}) {
        this.dragonId = dragonId || DRAGON_OBJ_DEFAULTS.dragonId;
        this.birthday = birthday || DRAGON_OBJ_DEFAULTS.birthday;
        this.nickname = nickname || DRAGON_OBJ_DEFAULTS.nickname;
        this.traits = traits || DRAGON_OBJ_DEFAULTS.traits;
        this.isPublic = isPublic || DRAGON_OBJ_DEFAULTS.isPublic;
        this.saleValue = saleValue || DRAGON_OBJ_DEFAULTS.saleValue;
        this.generationId = generationId || DRAGON_OBJ_DEFAULTS.generationId;
    }
}

module.exports = Dragon;
