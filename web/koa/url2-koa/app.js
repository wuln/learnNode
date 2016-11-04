// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
// 导入middleware
const controller = require('./controller');
// 创建一个Koa对象表示web app本身
const app = new Koa();

// 参数ctx是由koa传入的封装了request和response的变量，next是koa传入的将要处理的下一个异步函数。
app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// koa-bodyparser必须在router之前被注册到app对象上。
app.use(bodyParser());

app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');