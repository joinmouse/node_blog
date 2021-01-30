var express = require('express')
var router = express.Router()
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require("../middleware/loginCheck")

// blog列表
router.get('/list', function(req, res, next) {
    let author = req.query.author || ''
    let keyword = req.query.keyword || ''
    
    const result = getList(author, keyword)
    return result.then(listData => {
        res.json(
            new SuccessModel(listData)
        )
    })
})

// 某篇blog 详情
router.get('/detail', function(req, res, next) {
    const result = getDetail(req.query.id)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
})

// 新建一篇博客
router.post('/new', loginCheck, (req, res, next) => {
    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
})

// 更新一篇博客
router.post('/update', loginCheck, (req, res, next) => {
    const result = updateBlog(req.query.id, req.body)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel("更新成功")
            )
        } else {
            res.json(
                new ErrorModel('更新博客失败')
            )
        }
    })
})

// 删除一篇博客
router.post('/delete', loginCheck, (req, res, next) => {
    const author = req.session.username
    console.log(author)
    const result = deleteBlog(req.query.id, author)
    console.log(result)
    return result.then(val => {
        console.log("val: ", val)
        if (val) {
            res.json(
                new SuccessModel("删除成功")
            )
        } else {
            res.json(
                new ErrorModel('删除博客失败')
            )
        }
    })
})

module.exports = router