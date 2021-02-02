const fs = require('fs')
const path = require('path')
const readline = require('readline')

const fileName = path.resolve(__dirname, 'data.txt')
const readStream = fs.createReadStream(fileName)

// 创建readline对象
const line = readline.createInterface({
    input: readStream
})

// 逐行读取
line.on('line', function(data) {
    console.log(data)
})
line.on('close', function() {
    console.log('end')
})