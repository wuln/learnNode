const fs=require('fs');

function addMapping(router, mapping) {
    for (var url in mapping) {        
        if (url.startsWith('GET ')) {
            // GET请求
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            // POST请求
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else if (url.startsWith('PUT ')) {
            // PUT请求
            var path = url.substring(4);
            router.put(path, mapping[url]);
            console.log(`register URL mapping: PUT ${path}`);
        } else if (url.startsWith('DELETE ')) {
            // DELETE 请求
            var path = url.substring(7);
            router.del(path, mapping[url]);
            console.log(`register URL mapping: DELETE ${path}`);
        } else {
            // 无效的URL
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    // readdirSync扫描controllers目录，找到所有js文件，导入，然后注册每个URL
    fs.readdirSync(__dirname + '/' + dir).filter((f) => {
        return f.endsWith('.js');
    }).forEach((f) => {
        console.log(`process controller: ${f}...`);
        // 导入js文件:
        let mapping = require(__dirname + '/' + dir + '/' + f);
        addMapping(router, mapping);
    });
}

module.exports=function(dir){
    let controllers_dir = dir || 'controllers',
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
}