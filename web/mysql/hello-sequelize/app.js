const Sequelize = require('sequelize');
const config = require('./config');

console.log('init sequelize...');

// 创建一个sequelize对象实例
var sequelize = new Sequelize(config.database, config.username, config.password,{
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

// 定义模型Pet,告诉Sequelize如何映射数据库表
var Pet = sequelize.define('pet', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
},{
    timestamps: false   // 关闭Sequelize自动添加timestamp的功能
});

// 往数据库中添加数据
// 1、Promise方式
var now = Date.now();
Pet.create({
    id: 'w-' + now,
    name: 'dudu',
    gender: false,
    birth: '2012-11-08',
    createdAt: now,
    updatedAt: now,
    version: 0
}).then(function(p){
    console.log('created.' + JSON.stringify(p));
}).catch(function(err){
    console.log('failed: ' + err);
});
// 2、await方式
(async () => {
    var d = await Pet.create({
        id: 'd-' + now,
        name: 'odie',
        gender: false,
        birth: '2012-08-08',
        createdAt: now,
        updatedAt: now,
        version: 0
    });
     console.log('created.' + JSON.stringify(d));
})();

// 查询数据、更新数据、删除数据
(async () => {
    var pets = await Pet.findAll({
        where: {
            name: 'dudu'
        }
    });
    console.log(`find ${pets.length} pets:`);
    for (let p of pets) {
        console.log(JSON.stringify(p));
        console.log('update pet...');
        p.gender = true;
        p.updatedAt = Date.now();
        p.version ++;
        await p.save();
        if (p.version === 3) {
            await p.destroy();
            console.log(`${p.name} was destroyed.`);
        }
    }
})();