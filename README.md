### node_blog
运用node搭建一套个人博客服务

---

### 技术方案
- 数据如何存储
- 如何与前端对接，即接口设计

#### 接口设计
| 描述 | 接口 | 方法 | url参数 | 备注 |
| :-----| ----: | :----: | ----: | :----: |
| 获取博客列表 | /api/blog/list | get | author 作者， keyword 关键字 | 参数为空的时候，则不过滤 |
| 获取某一篇博客 | /api/blog/detail | get | id | |
| 新增一篇博客 | /api/blog/new | post | | |
| 更新一篇博客 | /api/blog/update | post | id | |
| 删除一篇博客 | /api/blog/delete | post | id | |
| 登录 | /api/blog/login | post | | |

#### 代码结构

- http-test http请求基础
- blog 使用原生JS实现一个blog的接口
- blog_express 使用框架express实现blog的接口
- mysql/redis-test mysql和redis链接数据库示例