const express = require('express');

const app = express();

const GenerationEngine = require('./generationEngine');
const Engine = new GenerationEngine();

Engine.start();

app.get('/dragon/new', (req, res) => {
  res.json({ dragon: Engine.generation.newDragon() });
});

const port = process.env.PORT || 3001;

app.listen(port, () =>
  console.log(`***********Server Running on Port ${port}***********`)
);

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
