const { execSql } = require('../db/mysql') 

const loginCheck = (username, password) => {
    const sql = `
        select username, realname from users where username='${username}' and password='${password}'
    `
    return execSql(sql).then(rows => {
        return rows[0] || {}
    })
}

module.exports = {
    loginCheck
}