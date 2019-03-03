const script2 = require ('./script2.js');
//const c = require('fs'); //file system - built in modules in node

const a = script2.largeNumber;
const b = 8;

setTimeout(() => {
    console.log(a + b);
}, 30);

//console.log(__dirname);
//console.log(c);
