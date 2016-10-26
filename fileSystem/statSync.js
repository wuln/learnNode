'use strict';

var fs = require('fs');

var stats = fs.statSync('test.txt');
if(stats && typeof stats == 'object'){
    console.log('isFile: ' + stats.isFile()); 
    console.log('isDirectory: ' + stats.isDirectory());
    if (stats.isFile()) {       
        console.log('size: ' + stats.size);    
        console.log('birthtime: ' + stats.birthtime);
        console.log('modifiedtime: ' + stats.mtime);
    }
}