const { getList, getDetail } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method  //GET POST
    const path = req.path
    const query = req.query

    // 获取博客列表
    if(method === 'GET' && path === '/api/blog/list') {
        const author = query.author || ''
        const keyword = query.keyword || ''
        const listData = getList(author, keyword)
        return new SuccessModel(listData)
    }

    // 获取博客详情
    if(method === 'GET' && path === '/api/blog/detail') {
        const id = query.id
        const data = getDetail(id)
        return new SuccessModel(data)
    }

    // 新建一篇博客
    if(method === 'POST' && path === '/api/blog/add') {
        return {
            msg: '这是新建博客的接口'
        }
    }

    // 更新一篇博客
    if(method === 'POST' && path === '/api/blog/update') {
        return {
            msg: '这是更新博客的接口'
        }
    }

    // 删除一篇博客
    if(method === 'POST' && path === '/api/blog/delete') {
        return {
            msg: '这是删除博客的接口'
        }
    }
}

module.exports = handleBlogRouter