const querystring = require('querystring')

const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json')

    // 获取path, url
    const url = req.url
    console.log(req.method)
    console.log(url)
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[1])
    console.log(res.query)
    console.log(req.path)
    let data = {
        path: res.path,
        query: res.query
    }
    res.end('111')
}

module.exports = serverHandle