const pool = require('../pgPool');
const TRAITS = require('../data/traits.json');

TRAITS.forEach(TRAIT => {
    const traitType = TRAIT.type;
    TRAIT.values.forEach(traitVal => {
        pool.query(
            'INSERT INTO trait("traitType", "traitValue") VALUES($1,$2) RETURNING id',
            [traitType, traitVal],
            (err, res) => {
                if (err) console.log(err);

                const traitId = res.rows[0].id;

                // console.log(`inserted trait -id: ${traitId}`);
            }
        );
    });
});
