console.log('init hello.js...');
// 对任意个参数求和
module.exports = function (...rest) {
    var sum = 0;
    for (let n of rest) {
        sum += n;
    }
    return sum;
};