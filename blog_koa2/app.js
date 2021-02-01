const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { REDIS_CONF } = require('./conf/db')
const fs = require('fs')
const path = require('path')
const morgan = require('koa-morgan')

const index = require('./routes/index')
const blog = require('./routes/blog')
const user = require('./routes/user')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// logger 日志
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
    // 开发环境 / 测试环境
    app.use(morgan('dev'));
} else {
    // 线上环境
    const logFileName = path.join(__dirname, 'logs', 'access.log')
    const writeStream = fs.createWriteStream(logFileName, {
        flags: 'a'
    })
    app.use(morgan('combined', {
        stream: writeStream
    }))
}


// session 配置
app.keys = ["WJiol_8776#"]
app.use(session({
    // 配置cookie
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 //1天
    },
    // 配置redis
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app