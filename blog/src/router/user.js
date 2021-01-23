const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { get, set } = require('../db/redis')

// 获取cookie的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24*60*60*1000))
    console.log('d.toUTCString() is ', d.toUTCString())
    return d.toUTCString()
}

const handleUserRouter = (req, res) => {
    const method = req.method  //GET POST
    const path = req.path

    // 登录
    if(method === 'GET' && path === '/api/user/login') {
        const { username, password } = req.query
        const result = loginCheck(username, password)
        return result.then(data => {
            if(data.username) {
                // 设置session
                req.session.username = data.username
                req.session.realname = data.realname
                console.log("res session is ", req.session)
                set(req.sessionId, req.session)

                console.log(username)
                res.setHeader('Set-Cookie', `username=${username}; path=/; expires=${getCookieExpires()}; Max-Age=3600; Secure; httpOnly`)
                return new SuccessModel("登录成功")
            }
            return new ErrorModel("登录失败")
        })
    }
}

module.exports = handleUserRouter