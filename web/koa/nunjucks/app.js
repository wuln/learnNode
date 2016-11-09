const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    var
        autoescape = opts.autoescape && true,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            // 创建一个文件系统加载器，从views目录读取模板
            new nunjucks.FileSystemLoader(path, {
                noCache: noCache,  // noCache: false使用缓存
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}
// 创建Nunjucks模板引擎对象
var env = createEnv('views', {
    watch: true,
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
});
// render(view, model)渲染模板
// view是模板的名称（视图）,model是数据
// 返回字符串
var s = env.render('hello.html', {
    name: '<Nunjucks>',
    fruits: ['Apple', 'Pear', 'Banana'],
    count: 12000
});

console.log(s);

// 模板的继承:基本网页框架base.html，子模板extend.html
// 渲染子模板
console.log(env.render('extend.html', {
    header: 'Nunjucks',
    body: 'A rich and powerful templating language for JavaScript.'
}));