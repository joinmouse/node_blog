const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
    const method = req.method  //GET POST
    const path = req.path

    // 登录
    if(method === 'POST' && path === '/api/user/login') {
        const result = loginCheck('1', '2')
        console.log(result)
        if(result) {
            return new SuccessModel()
        }else {
            return new ErrorModel("登录失败")
        }
    }
}

module.exports = handleUserRouter