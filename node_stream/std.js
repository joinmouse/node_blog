// 标准输入输出， pipe就是管道(符合水流管道模型)
// process.stdin 获取数据
// process.stdout 通过pipe管道直接传递给process.stdout
process.stdin.pipe(process.stdout)