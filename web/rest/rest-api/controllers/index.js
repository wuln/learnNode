// 入口函数
module.exports = {
    'GET /': async (ctx, next) => {
        ctx.render('index.html');
    }
};