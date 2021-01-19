const { execSql } = require('../db/mysql')

const getList = (author, keyword) => {
    // author, keyword不确定
    let sql = "select * from blogs where 1=1"
    if(author) {
        sql += ` and author='${author}'`
    }
    if(keyword) {
        sql += ` and title like '%${keyword}%'`
    }
    sql += " order by createTime desc"
    return execSql(sql)
}

const getDetail = (id) => {
    let sql = `select * from blogs where id=${id}`
    return execSql(sql).then(rows => {
        return rows[0]  //数组 => 对象
    })
}

const newBlog = (blogData = {}) => {
    // blogData是一个blog对象，包含title、content、author属性
    let title = blogData.title
    let content = blogData.content
    let author = blogData.author
    let createTime = Date.now()
    console.log('newBlog data...' + blogData)
    const sql = `
        insert into blogs (title, content, createTime, author)
        values ('${title}', '${content}', ${createTime}, '${author}');
    `
    
    return execSql(sql).then(insertData => {
        console.log(insertData)
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    // id是要更新博客的id
    // blogData是一个blog对象，包含title、content属性
    let title = blogData.title
    let content = blogData.content
    const sql = `
        update blogs set title='${title}', content='${content}' where id=${id}
    `
    return execSql(sql).then(updateData => {
        console.log('updateData is ', updateData.affectedRows)
        if(updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const deleteBlog = (id, body = {}) => {
    // id是更新博客的id
    let author = body.author
    console.log(author)
    const sql = `
        delete from blogs where id='${id}' and author='${author}'
    `
    return execSql(sql).then(deleteData => {
        if(deleteData.affectedRows > 0) {
            return true
        }
        return false
    })
};

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}