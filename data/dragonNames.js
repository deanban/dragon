const fs = require('fs');

let nameArr = fs
    .readFileSync('data/dragon_names.txt')
    .toString('utf-8')
    .split('\n')
    .filter(names => names !== '');

const name = nameArr[Math.floor(Math.random() * nameArr.length)];

console.log(typeof name);
