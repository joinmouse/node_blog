const http = require('http')
const slice = Array.prototype.slice

class myExpress {
    constructor() {
        // 存放中间件列表
        this.routes = {
            all: [],
            get: [],
            post: []
        }
    }
    // 通用注册的方法
    register(path) {
        const info = {}
        if(typeof path === 'string') {
            info.path = path
            // 从第二个参数开始，转换为数组，存入stack
            info.stack = slice.call(arguments, 1)
        }else {
            info.path = '/'  //定义为根路由
            info.stack = slice.call(arguments, 0)
        }
        return info
    }

    use() {
        const info = this.register.apply(this, arguments)
        this.routes.all.push(info)
    }

    get() {
        const info = this.register.apply(this, arguments)
        this.routes.get.push(info)
    }

    post() {
        const info = this.register.apply(this, arguments)
        this.routes.post.push(info)
    }

    match(method, url) {
        let queue = []
        if (url === '/favicon.ico') {
            return queue
        }
        // 获取routes
        let curRoutes = []
        curRoutes = curRoutes.concat(this.routes.all)
        curRoutes = curRoutes.concat(this.routes[method])

        curRoutes.forEach(routeInfo => {
            if (url.indexOf(routeInfo.path) === 0) {
                queue = queue.concat(routeInfo.stack)  //可能是多个
            }
        })
        return queue
    }

    // 核心next机制, 很巧妙
    handle(req, res, queue) {
        const next = () => {
            // 取队列的第一个元素
            const middleware = queue.shift()
            // 执行中间件, 直到队列为空
            if(middleware) {
                middleware(req, res, next)
            }
        }
        next()
    }

    listen(...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)
    }

    callback() {
        return (req, res) => {
            res.json = (data) => {
                res.setHeader('Content-type', 'application/json')
                res.end(
                    JSON.stringify(data)
                )
            }
            const url = req.url
            const method = req.method.toLowerCase()

            const resultList = this.match(method, url)
            this.handle(req, res, resultList)
        }
    }
}

// 工厂函数
module.exports = () => {
    return new myExpress()
}