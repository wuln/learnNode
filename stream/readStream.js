'use strict';

const fs = require('fs');

var rs = fs.createReadStream('test.txt', 'utf-8');
rs.on('data', (chunk)=>{
    console.log('DATA: ');
    console.log(chunk);
});

rs.on('end', ()=>{
    console.log('no more data!');
});

rs.on('error', (err)=>{
    console.log(err.message);
});
