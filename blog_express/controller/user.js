const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = (username, password) => {
    username = escape(username)
    
    // 加密的密码
    password = genPassword(password)
    password = escape(password)

    console.log(username)
    console.log(password)

    const sql = `
        select username, realname from users where username=${username} and password=${password}
    `

    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}

module.exports = login