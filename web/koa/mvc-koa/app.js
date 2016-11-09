// 用koa处理不同的URL，用Nunjucks渲染模板
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const templating = require('./templating');
const app = new Koa();
// 生产环境上配置环境变量NODE_ENV = 'production'
const isProduction = process.env.NODE_ENV === 'production';

// 调用异步函数处理URL:记录URL及页面执行时间
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// 处理静态文件
if (! isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

// 解析POST请求
app.use(bodyParser());

// 给ctx加上render()来使用Nunjucks
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

// 处理URL路由
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');
