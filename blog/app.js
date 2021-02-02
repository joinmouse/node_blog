const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { get, set } = require('./src/db/redis')
const { access } = require('./')

let SESSION_DATA = {}

//处理Post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if(req.method !== 'POST' || req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    // 记录 access log
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']}`)

    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json')

    // 获取path
    const url = req.url
    req.path = url.split('?')[0]
    // 解析query
    req.query = querystring.parse(url.split('?')[1])

    // 解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if(!item) return
        console.log(item)
        const arr = item.split('=')
        req.cookie[arr[0]] = arr[1];
    })
    console.log("req.cookie is ", req.cookie)


    // 解析session
    // let needSetCookie = false
    // let userId = req.cookie.userId
    // if(userId) {
    //     if(!SESSION_DATA[userId]) {
    //         SESSION_DATA[userId] = {}
    //     }
    // }else {
    //     needSetCookie = true
    //     userId = `${Date.now()}`
    //     SESSION_DATA[userId] = {}
    // }
    // req.session = SESSION_DATA[userId]

    // 解析session
    let needSetCookie = false
    let userId = req.cookie.userid
    if(!userId) {
        needSetCookie = true
        userId = `${Date.now()}`
        //初始化redis的值
        set(userId, {})
    }
    req.sessionId = userId

    // session初始化 -> post处理 -> 路由处理
    get(req.sessionId).then(sessionData => {
        if (sessionData == null) {
            // 初始化 redis 中的 session 值
            set(req.sessionId, {})
            // 设置 session
            req.session = {}
        } else {
            // 设置 session
            req.session = sessionData
        }
        // console.log('req.session ', req.session)

        // 处理 post data
        return getPostData(req)
    }).then(postData => {
        req.body = postData

        // 处理blog路由
        const blogResult = handleBlogRouter(req, res)
        if(blogResult) {
            blogResult.then(blogData => {
                if(needSetCookie) {
                    res.setHeader('Set-Cookie', `userId=${userId}; path=/; Max-Age=3600; httpOnly`)
                }
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }
        
        // 处理user路由
        const userResult = handleUserRouter(req, res)
        if(userResult) {
            userResult.then(userData => {
                if(needSetCookie) {
                    console.log(userId)
                    res.setHeader('Set-Cookie', `userId=${userId}; path=/; Max-Age=3600; httpOnly`)
                }
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }
        //未命中路由，返回404
        res.writeHead(404, {"Content-type": "text/plain"})
        res.write("404 Not Found\n")
        res.end()
    })
}

module.exports = serverHandle