const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const dragonRouter = require('./routes/api/dragon');
const generationRouter = require('./routes/api/generation');
const accountRouter = require('./routes/api/account');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const GenerationEngine = require('./generation/generationEngine');

const Engine = new GenerationEngine();
app.locals.Engine = Engine;

//express recognizes the use of the following four params as
//an error handling function.
//use 'next' in the router files to have those send the errors
//to this middleware.
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        type: 'error',
        message: err.message
    });
});

app.use('/dragon', dragonRouter);
app.use('/dragon', generationRouter);
Engine.start();
app.use('/account', accountRouter);

module.exports = app;

// const Generation = require('./generation');

// const generation = new Generation();
// console.log('generation', generation);

// const merlin = generation.newDragon({ nickname: 'merlin' });
// console.log('merlin', merlin);

// setTimeout(() => {
//   const mimar = generation.newDragon();
//   console.log('mimar', mimar);
// }, 15);

// const Dragon = require('./dragon');

// const fooey = new Dragon({
//   birthday: new Date().toLocaleString(),
//   nickname: 'fooey'
// });
// const baloo = new Dragon({
//   birthday: new Date().toLocaleString(),
//   nickname: 'baloo'
// });

// setTimeout(() => {
//   const merlin = new Dragon();
//   console.log(merlin);
// }, 1000);

// console.log(fooey);
// console.log(baloo);
