const getList = (author, keyword) => {
    //先返回假数据
    return [
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: 1607406352531,
            author: '王二'
        },
        {
            id: 2,
            title: '标题B',
            content: '内容B',
            createTime: 1607406351213,
            author: '张三'
        }
    ]
}

const getDetail = (id) => {
    //先返回假数据
    return [
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: 1607406352531,
            author: '王二'
        }
    ]
}

const newBlog = (blogData = {}) => {
    // blogData是一个blog对象，包含title、content属性
    console.log('newBlog data...' + blogData)
    return {
        id: 3
    }
}

const updateBlog = (id, blogData = {}) => {
    // id是要更新博客的id
    // blogData是一个blog对象，包含title、content属性
    console.log('update blog... ' + id)
    console.log('update blog... ' + blogData)
    return false
}

const deleteBlog = (id) => {
    // id是更新博客的id
    return true
};


module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}