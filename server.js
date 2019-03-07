const Dragon = require('./dragon');

const fooey = new Dragon({
  birthday: new Date().toLocaleString(),
  nickname: 'fooey'
});
const baloo = new Dragon({
  birthday: new Date().toLocaleString(),
  nickname: 'baloo'
});

setTimeout(() => {
  const merlin = new Dragon({ nickname: 'merlin' });
  console.log(merlin);
}, 1000);

console.log(fooey);
console.log(baloo);
