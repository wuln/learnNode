'use strict';

var fs = require('fs');

console.log('>>>Begin>>>');

var data = 'write file sync';
try{
    fs.writeFileSync('write.txt', data);
    console.log('ok!');
}catch(err){
    Console.log(err);
}

console.log('>>>End>>>');