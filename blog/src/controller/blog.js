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

module.exports = {
    getList,
    getDetail
}