'use strict';

// 导入module
const fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

// http 404
function errRes(response, err){
    // 将http响应404写入response
    response.writeHead(404, {'Content-Type': 'text/plain'});
    // 将http响应的内容写入response
    response.end(err, 'utf-8');
}
// http 200 返回请求的文件
function fileRes(response, filepath){
    response.writeHead(200);
    fs.createReadStream(filepath).pipe(response);
}
// http 200 返回请求目录下的文件
function dirRes(response, dirpath){   
    fs.readdir(dirpath, (err, files)=>{
        if (err) {
            console.log('404 ' + err);
        } else {
            console.log(files);
            var names = files.filter(function (x) {
                return x .indexOf('.html') > -1;
            });
            if (names.length > 0) {
                fileRes(response, path.join(dirpath, names[0]));
            } else {
                errRes(response, '该目录下没有有效的文件！')
            }
        }
    });
}

// 从命令行参数获取root目录，默认是当前目录
var root = path.resolve(process.argv[2] || '.');
console.log('static root dir: ' + root);    

// 创建http server
var server = http.createServer(function(request, response){
    // 获取请求url的path
    var pathname = url.parse(request.url).pathname;
    // 获取本地文件路径
    var filepath = path.join(root, pathname);
    // 获取文件状态
    fs.stat(filepath, function(err, stats){
        if (err) {
            // 出错了或者文件不存在            
            console.log('404 ' + filepath);
            errRes(response, err.message);
        } else {
            if(stats.isFile()){
                console.log('200 ' + filepath);
                fileRes(response, filepath);
            } else if(stats.isDirectory()){              
                dirRes(response, filepath);
            }            
        }
    });
});    

server.listen('8080');
console.log('Server is running at http://127.0.0.1:8080/');