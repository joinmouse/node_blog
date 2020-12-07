const http = require('http')

const PROT = 3100
const serverHandle = require('../app')

const server = http.createServer(serverHandle)
server.listen(PROT, () => {
    console.log('3100端口开启了哦~')
})