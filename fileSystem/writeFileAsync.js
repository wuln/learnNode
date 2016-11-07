'use strict';

var fs = require('fs');

console.log('>>>Begin>>>');

var data = 'write file async';

fs.writeFile('write.txt', data, function(err){
    if (err) throw err;
    console.log('ok');
});

console.log('>>>End>>>');