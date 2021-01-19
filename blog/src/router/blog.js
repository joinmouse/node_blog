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
        const result = getList(author, keyword)
        console.log(result)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    // 获取博客详情
    if(method === 'GET' && path === '/api/blog/detail') {
        const result = getDetail(query.id)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 新建一篇博客
    if(method === 'POST' && path === '/api/blog/new') {
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 更新一篇博客
    if(method === 'POST' && path === '/api/blog/update') {
        let result = updateBlog(query.id, req.body)
        console.log(req.body)
        return result.then(val => {
            console.log("val " + val)
            if(val) {
                console.log('xxxxx')
                return new SuccessModel("更新成功")
            }
            return new ErrorModel("更新博客失败")
        })
    }

    // 删除一篇博客
    if(method === 'POST' && path === '/api/blog/delete') {
        let result = deleteBlog(query.id, req.body)
        return result.then(val => {
            if(val) {
                return new SuccessModel("删除成功")
            }else {
                return new ErrorModel("删除博客失败")
            }
        })
    }
}

module.exports = handleBlogRouter