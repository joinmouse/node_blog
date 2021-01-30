const redis = require('redis')

//1、创建客户端
const redisClient = redis.createClient(6379, '127.0.0.1')
redisClient.on('error', err => {
    console.error(err)
})

//2、使用: get、set
redisClient.set('name', 'joinmouse', redis.print)

redisClient.get('name', (err, val) => {
    if(err) {
        console.log(err)
        return
    }
    console.log('val: ' + val)
    
    redisClient.quit()
})