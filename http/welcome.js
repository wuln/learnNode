'use strict';
// 导入http模块:
const http = require('http');

// 创建http server，并传入回调函数,回调函数接收request和response对象
var server = http.createServer(function(request, response){
    // 获得HTTP请求的method和url
    console.log(request.method + ':' + request.url);
    // 将HTTP响应200写入response, 同时设置Content-Type: text/html
    response.writeHead('200', {'Content-Type': 'text/html'});
    // 将HTTP响应的HTML内容写入response
    response.end('<h1 style="font-size: 32px; font-weight:bold; text-align: center">welcome!<h1><p style="font-size: 16px;">The HTTP interfaces in Node.js are designed to support many features of the protocol which have been traditionally difficult to use. In particular, large, possibly chunk-encoded, messages. The interface is careful to never buffer entire requests or responses--the user is able to stream data.<p>');
});

// 让server监听8080端口
server.listen('8080');
console.log('Server is running at http://127.0.0.1:8080/');
