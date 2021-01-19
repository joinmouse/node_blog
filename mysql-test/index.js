const mysql = require('mysql')

//1、创建连接对象
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'node_blog'
})

//2、开始连接
con.connect()

// 执行sql
const sql = 'select * from users'
con.query(sql, (err, res) => {
    if(err) {
        console.log(err)
        return
    }
    console.log(res)
})

//3、关闭链接
con.end()