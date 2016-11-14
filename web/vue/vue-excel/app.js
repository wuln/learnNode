const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const rest = require('./rest');
const app = new Koa();
const isProduction = process.env.NODE_ENV === 'production';

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);   
    await next();   
});

let staticFiles = require('./static-files');
app.use(staticFiles('/static/', __dirname + '/static'));

app.use(async (ctx, next) => {
    if (ctx.request.path === '/') {
        ctx.response.redirect('/static/index.html');
    } else {
        await next();
    }
});
//解析request body
app.use(bodyParser());

// 给ctx绑定rest()
app.use(rest.restify());

app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');