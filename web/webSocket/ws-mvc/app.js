// 用koa处理不同的URL，用Nunjucks渲染模板
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const url = require('url');
const ws = require('ws');
const Cookies = require('cookies');
const controller = require('./controller');
const templating = require('./templating');

// 引用Server类
const WebSocketServer = ws.Server;
const app = new Koa();

// 调用异步函数处理URL:记录URL
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);   
    await next();   
});
// 在koa的middleware中识别用户
app.use(async (ctx, next) => {
    ctx.state.user = parseUser(ctx.cookies.get('name') || '');
    await next();
});

// 处理静态文件
let staticFiles = require('./static-files');
app.use(staticFiles('/static/', __dirname + '/static'));

// 解析POST请求
app.use(bodyParser());

// 添加Nunjucks views
app.use(templating('views', {
    noCache: true,
    watch: true
}));

// 处理URL路由
app.use(controller());

// koa app的listen()方法返回http.Server:
let server = app.listen(3000);

// 识别用户身份
function parseUser(obj) {
    if (!obj) {
        return;
    }
    console.log('try parse: ' + obj);
    let s = '';
    if (typeof obj === 'string') {
        s = obj;
    } else if (obj.headers) {
        let cookies = new Cookies(obj, null);
        s = cookies.get('name');
    }
    if (s) {
        try {
            let user = JSON.parse(Buffer.from(s, 'base64').toString());
            console.log(`User: ${user.name}, ID: ${user.id}`);
            return user;
        } catch (e) {
            // ignore
        }
    }
}

function createWebSocketServer(server, onConnection, onMessage, onClose, onError) {
    // 浏览器创建WebSocket时发送的仍然是标准的HTTP请求
    // 无论是WebSocket请求，还是普通HTTP请求，都会被http.Server处理
    // 创建WebSocketServer:
    let wss = new WebSocketServer({
        server: server
    });
    // 广播
    wss.broadcast = function broadcast(data) {
            wss.clients.forEach(function each(client) {
                client.send(data);
            });
    };
    onConnection = onConnection || function () {
            console.log('[WebSocket] connected.');
    };
    onMessage = onMessage || function (msg) {
            console.log('[WebSocket] message received: ' + msg);
    };
    onClose = onClose || function (code, message) {
            console.log(`[WebSocket] closed: ${code} - ${message}`);
    };
        onError = onError || function (err) {
            console.log('[WebSocket] error: ' + err);
    };
    // 在WebSocketServer中响应connection事件识别用户,回调函数传入一个WebSocket的实例
    wss.on('connection', function (ws) {
        let location = url.parse(ws.upgradeReq.url, true);
        console.log('[WebSocketServer] connection: ' + location.href);
        ws.on('message', onMessage);
        ws.on('close', onClose);
        ws.on('error', onError);
        if (location.pathname !== '/ws/chat') {
            // close ws:
            ws.close(4000, 'Invalid URL');
        }
        // ws.upgradeReq是一个request对象
        let user = parseUser(ws.upgradeReq);
        if (!user) {
            ws.close(4001, 'Invalid user');
        }
        // 识别成功，把user绑定到该WebSocket对象
        ws.user = user;
        // 绑定WebSocketServer对象
        ws.wss = wss;
        onConnection.apply(ws);
    });
    console.log('WebSocketServer was attached.');
    return wss;
}

// 消息ID
var messageIndex = 0;

function createMessage(type, user, data) {
    messageIndex ++;
    return JSON.stringify({
        id: messageIndex,
        type: type,
        user: user,
        data: data
    });
}

function onConnect() {
    let user = this.user;
    let msg = createMessage('join', user, `${user.name} joined.`);
    this.wss.broadcast(msg);
    // build user list:
    let users = this.wss.clients.map(function (client) {
        return client.user;
    });
    this.send(createMessage('list', user, users));
}

function onMessage(message) {
    console.log(message);
    if (message && message.trim()) {
        let msg = createMessage('chat', this.user, message.trim());
        this.wss.broadcast(msg);
    }
}

function onClose() {
    let user = this.user;
    let msg = createMessage('left', user, `${user.name} is left.`);
    this.wss.broadcast(msg);
}

app.wss = createWebSocketServer(server, onConnect, onMessage, onClose);
console.log('app started at port 3000...');
