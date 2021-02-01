const router = require('koa-router')()
const login  = require('../controller/user')
const { ErrorModel, SuccessModel } = require('../model/resModel')

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
    const { username, password } = ctx.request.body
    const data = await login(username, password)
    // 登录成功
    if (data.username) {
        // 设置 session, 会存入redis中
        ctx.session.username = data.username
        ctx.session.realname = data.realname
        ctx.body = new SuccessModel("登录成功~")
        return
    }
    // 登录失败
    ctx.body = new ErrorModel("输入的用户名/密码出错，登录失败")
})

module.exports = router