
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
// 导入middleware
const controller = require('./controller');
const app = new Koa();

app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// koa-bodyparser必须在router之前被注册到app对象上。
app.use(bodyParser());

app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');