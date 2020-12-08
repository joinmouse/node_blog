const handleUserRouter = (req, res) => {
    const method = req.method  //GET POST
    const path = req.path

    // 登录
    if(method === 'POST' && path === '/api/user/login') {
        return {
            msg: '这是一个登录的接口'
        }
    }
}

module.exports = handleUserRouter