'use strict';

const fs = require('fs');

var wsData = fs.createWriteStream('data.txt', 'utf-8');
wsData.write('>>>begin>>>\n');
wsData.write('writable.write(chunk[, encoding][, callback])\n');
wsData.write('>>>end>>>');
wsData.end();

var wsBuf = fs.createWriteStream('buf.txt');
wsBuf.write(new Buffer('>>>begin>>>\n', 'utf-8'));
wsBuf.write(new Buffer('writable.write(chunk[, encoding][, callback])\n', 'utf-8'));
wsBuf.write(new Buffer('>>>end>>>', 'utf-8'));
wsBuf.end();

