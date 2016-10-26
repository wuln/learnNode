'use strict';

var fs = require('fs');

fs.stat('test.txt', function(err, stats){
    if(err){
        console.log(err);
    }else{
        console.log('isFile: ' + stats.isFile());
        console.log('isDirectory: ' + stats.isDirectory());
        if(stats.isFile()){
            console.log('size: ' + stats.size);
            console.log('birthtime: ' + stats.birthtime);
            console.log('modifiedtime: ' + stats.mtime);
        }        
    }
});