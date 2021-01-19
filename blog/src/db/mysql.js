const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config/db')

//1、创建连接对象
const con = mysql.createConnection(MYSQL_CONFIG)

//2、开始连接
con.connect()

// 封装一个统一执行sql的函数
function execSql(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, res) => {
            if(err) {
                reject(sql)
                return
            }
            resolve(res)
        })
    }) 
    return promise
}

module.exports = {
    execSql
}