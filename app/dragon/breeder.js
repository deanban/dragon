const base64 = require('base-64');
const Dragon = require('./dragon');

class Breeder {
    static breedDragons({ matron, patron }) {
        const matronTraits = matron.traits;
        const patronTraits = patron.traits;
        let babyTraits = [];

        matronTraits.forEach(({ traitType, traitValue }) => {
            const matronTrait = traitValue;
            // console.log(matronTrait);

            const patronTrait = patronTraits.find(
                trait => trait.traitType === traitType
            ).traitValue;
            // console.log(patronTrait);

            babyTraits.push({
                traitType,
                traitValue: Breeder.pickTraits({ matronTrait, patronTrait })
            });
        });
        return new Dragon({ traits: babyTraits });
    }

    static pickTraits({ matronTrait, patronTrait }) {
        console.log('breeding started');
        //string value of both traits are encoded to introduce some randomacy..
        //..with 50% chance of being picked from either.
        // Both traits have their character summed.
        //get a range by adding both character sums.
        //generate a randon number in that range
        //if number < matron's character sum, pick matron.
        //else pick patron

        if (matronTrait === patronTrait) return matronTrait;

        const matronTraitCharSum = Breeder.charSum(base64.encode(matronTrait));
        const patronTraitCharSum = Breeder.charSum(base64.encode(patronTrait));
        const random = Math.floor(
            Math.random() * matronTraitCharSum + patronTraitCharSum
        );

        return random < matronTraitCharSum ? matronTrait : patronTrait;
    }

    static charSum(str) {
        return str
            .split('')
            .reduce((sum, char) => (sum += char.charCodeAt()), 0);
    }
}

module.exports = Breeder;

const fooby = new Dragon();
const gooby = new Dragon();

const foogooby = Breeder.breedDragons({ matron: fooby, patron: gooby });

console.log(foogooby);
