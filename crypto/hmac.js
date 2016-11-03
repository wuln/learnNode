'use strict';

const crypto = require('crypto');
const hmac = crypto.createHmac('sha256', 'secret-key');

hmac.update('Hello, world!');
hmac.update('Hello, nodejs!');

var r = hmac.digest('hex');
console.log(`sha256 hmac: ${r}`);