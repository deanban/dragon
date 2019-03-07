const express = require('express');
const dragonRouter = require('./routes/api/dragon');
const generationRouter = require('./routes/api/generation');
const app = express();

const GenerationEngine = require('./generation/generationEngine');

const Engine = new GenerationEngine();
app.locals.Engine = Engine;

app.use('/dragon', dragonRouter);
app.use('/dragon', generationRouter);
Engine.start();

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
