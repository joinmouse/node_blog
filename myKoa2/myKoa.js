const http = require('http')

class myKoa {
    constructor() {
        this.middlewareList = []
    }

    use(fn) {
        this.middlewareList.push(fn)
        // 链式调用
        return this
    }

    listen(...arg) {
        const server = http.createServer(this.callback())
        server.listen(...arg)
    }

    callback() {
        const fn = compose(this.middlewareList)
        return (req, res) => {
            const ctx = this.createContext(req, res)
            // handle qequert
            return this.handleRquest(fn, ctx)
        }
    }

    handleRquest(fn, ctx) {
        return fn(ctx)
    }

    createContext(req, res) {
        const ctx = {
            req, 
            res
        }
        ctx.query = req.query
        return ctx
    }
}

// 组合中间件
function compose(middlewareList) {
    return function(ctx) {
        function dispatch(i) {
            const fn = middlewareList[i]
            // 返回promise 对象
            try {
                return Promise.resolve(
                    fn(ctx, dispatch.bind(null, i+1))
                )
            }catch(e) {
                return Promise.reject(e)
            }
        }
        return dispatch(0)
    }
}

module.exports = myKoa