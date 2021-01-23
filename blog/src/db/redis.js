const redis = require('redis')
const { REDIS_CONFIG } = require('../config/db')

const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host)

redisClient.on('error', err => {
    console.log(err)
})

function set(key, value) {
    // 对象转为字符串
    if(typeof value === 'object') {
        value = JSON.stringify(value)
    }
    redisClient.set(key, value)
}

function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if(err) {
                reject(err)
                return
            }
            if(val === null) {
                resolve(null)
            }
            // 如果是对象就解析一下
            try {
                resolve(
                    JSON.parse(val)
                )
            }catch(e) {
                resolve(val)
            }
        })
    })
    return promise
}

module.exports = {
    get,
    set
}