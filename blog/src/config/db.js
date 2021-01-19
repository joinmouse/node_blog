const mysql = require('mysql')
// 环境参数
const env = process.env.NODE_ENV

let MYSQL_CONFIG

// 开发环境
if(env === 'dev') {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'node_blog'
    }
}

// 生产环境
if(env === 'production') {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'node_blog'
    }
}

module.exports = {
    MYSQL_CONFIG
}