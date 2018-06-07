'use strict';

var fs = require('fs');

console.log('>>>Begin>>>');

fs.readFile('test.txt', 'utf-8', function(err, data){
    if (err) throw err;
    console.log(data);
});

console.log('>>>End>>>');