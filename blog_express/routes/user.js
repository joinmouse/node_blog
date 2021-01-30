const express = require('express')
const router = express.Router()
const login  = require('../controller/user')
const { ErrorModel, SuccessModel } = require('../model/resModel')

// 登录接口
router.post('/login', function(req, res, next) {
    const { username, password } = req.body
    const result = login(username, password)
    return result.then(data => {
        // 登录成功
        if (data.username) {
            // 设置 session, 会存入redis中
            req.session.username = data.username
            req.session.realname = data.realname

            res.json(
                new SuccessModel("登录成功~")
            )
            return
        }
        // 登录失败
        res.json(
            new ErrorModel("输入的用户名/密码出错，登录失败")
        )
    })
})

module.exports = router