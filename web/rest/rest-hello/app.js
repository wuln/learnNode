const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const app = new Koa();

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
// 解析HTTP请求body，如果HTTP请求是JSON数据，可以通过ctx.request.body直接访问解析后的JavaScript对象
app.use(bodyParser());

app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');