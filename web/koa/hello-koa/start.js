// 启动app.js前自动让Babel转码
// 用Babel转码时，需要指定presets和plugins。
// 第一个require()是Node正常加载babel-core/register的过程
// 然后，Babel会用自己的require()替换掉Node的require(),所有代码均会被Babel自动转码后再加载

require('babel-core/register')({
    presets: ['stage-3']
});

require('./app.js');