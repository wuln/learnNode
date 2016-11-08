
const Koa = require('koa');

// 解析原始request请求，然后把解析后的参数绑定到ctx.request.body中的middleware
const bodyParser = require('koa-bodyparser');

// 负责处理URL映射的middleware，require('koa-router')返回的是函数
const router = require('koa-router')();

// 创建一个Koa对象表示web app本身
const app = new Koa();

// 参数ctx是由koa传入的封装了request和response的变量，next是koa传入的将要处理的下一个异步函数。
app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// koa-bodyparser必须在router之前被注册到app对象上。
app.use(bodyParser());

// 注册get请求：router.get('/path', async fn)
router.get('/hello/:name', async(ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/', async(ctx, next) => {
    ctx.response.body =  `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

// router.post('/path', async fn)
router.post('/signin', async (ctx, next) => {
    var name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
});

// add router middleware
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');