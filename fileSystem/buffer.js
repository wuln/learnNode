'use strict';

const fs = require('fs');

fs.readFile('test.txt', function(err, data){
    if(err){
        console.log(err);
    } else {
        console.log(data);
        console.log(data.length + 'bytes');
        console.log('first three bytes: ' + data[0] + ',' + data[1] + ','+ data[2]);       
        var text = data.toString('utf-8'); 
        console.log(text);
        var buf = new Buffer(data ,'utf-8');       
        console.log(buf);
    }
});