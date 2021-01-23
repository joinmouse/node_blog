// 环境参数
const env = process.env.NODE_ENV

let MYSQL_CONFIG
let REDIS_CONFIG

// 开发环境
if(env === 'dev') {
    // mysql_config
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'node_blog'
    },
    // redis_config
    REDIS_CONFIG = {
        host: '127.0.0.1',
        port: 6379
    }
}

// 生产环境
if(env === 'production') {
    // mysql_config
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'node_blog'
    }
    // redis_config
    REDIS_CONFIG = {
        host: '127.0.0.1',
        port: 6379
    }
}

module.exports = {
    MYSQL_CONFIG,
    REDIS_CONFIG
}