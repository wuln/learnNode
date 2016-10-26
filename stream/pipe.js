'use strict';

const fs = require('fs');

var rs = fs.createReadStream('test.txt', 'utf-8');
var ws = fs.createWriteStream('pipe.txt', 'utf-8')

// readable.pipe(writable, { end: false });
rs.pipe(ws),{ end: false };