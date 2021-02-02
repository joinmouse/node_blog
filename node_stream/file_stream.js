const fs = require('fs')
const path = require('path')

let fileName1 = path.resolve(__dirname, 'data.txt')
let fileName2 = path.resolve(__dirname, 'data_copy.txt')

let readStream = fs.createReadStream(fileName1)
let writeStream = fs.createWriteStream(fileName2)
// 执行copy, 通过pipe
readStream.pipe(writeStream)

readStream.on('data', function(chunk) {
    console.log(chunk.toString())
})

readStream.on('end', function() {
    console.log("copy end")
})