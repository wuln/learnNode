'use strict';

import { readFile } from "fs";

console.log('>>>Begin>>>');

readFile('test.txt', 'utf-8', function(err, data){
    if (err) throw err;
    console.log(data);
});

console.log('>>>End>>>');