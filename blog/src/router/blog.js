const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
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
    if(method === 'POST' && path === '/api/blog/new') {
        const data = newBlog(req.body)
        return new SuccessModel(data)
    }

    // 更新一篇博客
    if(method === 'POST' && path === '/api/blog/update') {
        let result = updateBlog(query.id, req.body)
        console.log(req.body)
        if(result) {
            return new SuccessModel()
        }else {
            return new ErrorModel("更新博客失败")
        }
    }

    // 删除一篇博客
    if(method === 'POST' && path === '/api/blog/delete') {
        let result = deleteBlog(query.id)
        if(result) {
            return new SuccessModel()
        }else {
            return new ErrorModel("更新博客失败")
        }
    }
}

module.exports = handleBlogRouter