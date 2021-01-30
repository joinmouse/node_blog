const login = require('../controller/user')
const { ErrorModel } = require('../model/resModel')

const loginCheck =  (req, res, next) => {
    if(req.session.username) {
        next()
        return
    }
    res.json(
        new ErrorModel("当前用户未登录")
    )
}

module.exports = loginCheck