'use strict';

var fs = require('fs');

console.log('>>>Begin>>>');

try{
    var data = fs.readFileSync('test.txt', 'utf-8');
    console.log(data);
}catch(err){
    Console.log(err);
}


console.log('>>>End>>>');