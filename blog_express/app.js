var createError = require('http-errors')
var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var session = require('express-session')
const redisClient = require('./db/redis')
var RedisStore = require('connect-redis')(session)
const sessionStorage = new RedisStore({
    client: redisClient
})

const userRouter = require('./routes/user')
const blogRouter = require('./routes/blog')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
    secret: "WJiol_8776#",  // 秘钥
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 //1天
    },
    store: sessionStorage
}))

app.use('/api/user', userRouter)
app.use('/api/blog', blogRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app