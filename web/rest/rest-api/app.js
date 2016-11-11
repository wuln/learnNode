// 用koa处理不同的URL，用Nunjucks渲染模板
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const templating = require('./templating');
const rest = require('./rest');
const app = new Koa();

// 调用异步函数处理URL:记录URL
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);   
    await next();   
});

// 处理静态文件
let staticFiles = require('./static-files');
app.use(staticFiles('/static/', __dirname + '/static'));

// 解析request body
app.use(bodyParser());

// 添加Nunjucks views
app.use(templating('views', {
    noCache: true,
    watch: true
}));

// 给ctx绑定rest()
app.use(rest.restify());
// 处理URL路由
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');
