const http = require('http')
const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')
const server = http.createServer((req, res) => {
    if(req.method === 'GET') {
        const readStream = fs.createReadStream(fileName)
        readStream.pipe(res)
    }
})
server.listen(8000)