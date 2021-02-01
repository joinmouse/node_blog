const router = require('koa-router')()
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require("../middleware/loginCheck")

router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
    let author = ctx.query.author || ''
    let keyword = ctx.query.keyword || ''
    // awit更简洁了
    const listData = await getList(author, keyword)
    ctx.body = new SuccessModel(listData)
})

router.get('/detail', async function(ctx, next) {
    const data = await getDetail(ctx.query.id)
    ctx.body = new SuccessModel(data)
})

// 新建一篇博客
router.post('/new', loginCheck, async (ctx, next) => {
    ctx.request.body.author = ctx.session.username
    const data = await newBlog(ctx.request.body)
    ctx.body = new SuccessModel(data)
})

router.post('/update', loginCheck, async (ctx, next) => {
    const val = await updateBlog(ctx.query.id, ctx.request.body)
    if (val) {
        ctx.body = new SuccessModel("更新成功")
    } else {
        ctx.body = new ErrorModel('更新博客失败')
    }
})

// 删除一篇博客
router.post('/delete', loginCheck, async (ctx, next) => {
    const author = ctx.session.username
    const val = await deleteBlog(ctx.query.id, author)
    if (val) {
        ctx.body = new SuccessModel("删除成功")
    } else {
        ctx.body = new ErrorModel('删除博客失败')
    }
})

module.exports = router