// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
// 创建一个Koa对象表示web app本身
const app = new Koa();

// 参数ctx是由koa传入的封装了request和response的变量，next是koa传入的将要处理的下一个异步函数。
app.use(async (ctx, next) => {
    const start = new Date().getTime();
    await next();
    const ms = new Date().getTime() - start;
    console.log(`${ctx.request.method} ${ctx.request.url}: ${ms}ms`);
    ctx.response.set('X-Response-Time', `${ms}ms`);
});
// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    await next();
     // 设置response的Content-Type:
    ctx.response.type = 'text/html';
     // 设置response的内容:
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});

app.listen(3000);
console.log('app started at port 3000...');