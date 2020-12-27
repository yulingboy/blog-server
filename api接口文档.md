## 1. 个人博客后台管理系统 API 接口文档

### 1.1. API V2 接口说明

- 接口基准地址：`http://127.0.0.1:3000/api/admin/v2/`
- 服务端已开启 CORS 跨域支持
- API V1 认证统一使用 Token 认证
- 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
- 使用 HTTP Status Code 标识状态
- 数据返回格式统一使用 JSON

#### 1.1.1. 支持的请求方法

- GET（SELECT）：从服务器取出资源（一项或多项）。
- POST（CREATE）：在服务器新建一个资源。
- PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
- PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
- DELETE（DELETE）：从服务器 删除资源。
- HEAD：获取资源的元数据。
- OPTIONS：获取信息，关于资源的哪些属性是客户端可以改变的。

#### 1.1.2. 通用返回状态说明

HTTP Status Code 标识状态

| 状态码 | 含义                  | 说明                                                |
| ------ | --------------------- | --------------------------------------------------- |
| 200    | OK                    | 请求成功                                            |
| 201    | CREATED               | 创建成功                                            |
| 204    | DELETED               | 删除成功                                            |
| 400    | BAD REQUEST           | 请求的地址不存在或者包含不支持的参数                |
| 401    | UNAUTHORIZED          | 未授权                                              |
| 403    | FORBIDDEN             | 被禁止访问                                          |
| 404    | NOT FOUND             | 请求的资源不存在                                    |
| 422    | Unprocesable entity   | [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误 |
| 500    | INTERNAL SERVER ERROR | 内部错误                                            |
|        |                       |                                                     |

### 1.2. 注册登录

#### 1.2.1. 注册接口

- 请求路径：reg

- 请求方法：post

- 请求参数：

| 参数名   | 参数说明 | 备注                                                  |
| -------- | -------- | ----------------------------------------------------- |
| username | 用户名   | 不能为空                                              |
| password | 用户密码 | 不能为空                                              |
| email    | 用户邮箱 | 不能为空                                              |
| role     | 用户类型 | 可以为空 默认为0     0 普通用户 1 管理员 2 超级管理员 |

- 响应参数

| 参数名   | 参数说明 | 备注          |
| -------- | -------- | ------------- |
| role     | 用户类型 | 0 正常 1 封禁 |
| state    | 用户状态 |               |
| _id      | 用户id   |               |
| email    | 用户邮箱 |               |
| password | 用户密码 |               |
| username | 用户昵称 |               |

- 响应数据

```json
{
    "meta": {
        "status": 200,
        "message": "注册用户成功"
    },
    "data": {
        "role": 1,
        "state": 0,
        "_id": "5fc891872efd87239cfb0793",
        "email": "test111@qq.com",
        "password": "$2b$10$Itwe0WbYHNlLcbLrUZviZOpNJkSH7j63xYF.RSDCg00rjXvLyDdwm",
        "username": "yuling",
        "__v": 0
    }
}
```

#### 1.2.2. 登录验证码

请求路径：captcha

请求方法： get

#### 1.2.3. 登录接口

- 请求路径：login

- 请求方法：post

- 请求参数：

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| email    | 用户邮箱 | 不能为空 |
| password | 用户密码 | 不能为空 |
| captcha  | 验证码   | 不能为空 |

- 响应参数

| 参数名   | 参数说明 | 备注          |
| -------- | -------- | ------------- |
| role     | 用户角色 |               |
| state    | 用户状态 |               |
| _id      | 用户id   |               |
| email    | 用户邮箱 |               |
| password | 用户密码 |               |
| username | 用户昵称 |               |
| token    | 令牌     | 基于jwt的令牌 |

- 响应数据

```json
{
    "meta": {
        "status": 200,
        "message": "登录成功！"
    },
    "data": {
        "user": {
            "role": 1,
            "state": 0,
            "_id": "5fc891872efd87239cfb0793",
            "email": "test111@qq.com",
            "password": "$2b$10$Itwe0WbYHNlLcbLrUZviZOpNJkSH7j63xYF.RSDCg00rjXvLyDdwm",
            "username": "yuling",
            "__v": 0
        },
        "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDY5ODIyNzQsImV4cCI6MTYwNzAyNTQ3NH0.J_MCHD57pctcQB94kud_rq-oax85-NVZTAvvhfumsaE"
    }
}
```

### 1.3. 用户管理

#### 1.3.1 用户数据列表

- 请求路径：users

- 请求方法： get

- 请求参数

| 参数名   | 参数说明         | 备注     |
| -------- | ---------------- | -------- |
| pageNum  | 当前页码         | 【可选】 |
| pageSize | 每页显示多少数据 | 【可选】 |

- 响应参数

| 参数名    | 参数说明           | 备注 |
| --------- | ------------------ | ---- |
| users     | 用户数据集合       |      |
| pageNum   | 当前第几页         |      |
| total     | 用户数据总数       |      |
| pageSize  | 每页显示多少条数据 |      |
| pageCount | 页码总数           |      |

- 响应数据

```json
{
    "meta": {
        "status": 200,
        "message": "success"
    },
    "data": {
        "users": [
            {
                "role": 1,
                "state": 1,
                "_id": "5f546a47a65be332c8c4b5ca",
                "username": "yuling1",
                "password": "$2b$10$m2/FSNbB/qG8ozaKn998z.RBCCrWFgBVOf0pu5N8KfeB2Xw0J/cCa",
                "email": "yuling111@163.com",
                "__v": 0
            },
            {
                "role": 0,
                "state": 0,
                "_id": "5f546a49a65be332c8c4b5cb",
                "username": "yuling1",
                "password": "$2b$10$kFkyKzTXz81.ZgZU/CCPX.SFFM25p4yurM2VBQ9s1sapXDkLLtZHK",
                "email": "yuling1111@163.com",
                "__v": 0
            }
        ],
        "pageNum": 2,
        "total": 19,
        "pageSize": 2,
        "pageCount": 10
    }
}
```

#### 1.3.2. 根据ID查询用户信息

- 请求路径：users/:id

- 请求方法：get

- 请求参数：

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| id     | 用户id   | 不能为空 |

- 响应参数

| 参数名   | 参数说明 | 备注 |
| -------- | -------- | ---- |
| role     | 用户角色 |      |
| state    | 用户状态 |      |
| _id      | 用户id   |      |
| email    | 用户邮箱 |      |
| password | 用户密码 |      |
| username | 用户昵称 |      |

- 响应数据

```json
{
    "meta": {
        "status": 200,
        "message": "success"
    },
    "data": {
        "role": 1,
        "state": 1,
        "_id": "5f546a47a65be332c8c4b5ca",
        "username": "yuling1",
        "password": "$2b$10$m2/FSNbB/qG8ozaKn998z.RBCCrWFgBVOf0pu5N8KfeB2Xw0J/cCa",
        "email": "yuling111@163.com",
        "__v": 0
    }
}
```

#### 1.3.3.  更新用户信息

- 请求路径：users/:id

- 请求方法：put

- 请求参数

| 参数名 | 参数说明     | 备注 |
| ------ | ------------ | ---- |
| query  | 修改参数信息 |      |

- 响应参数

| 参数名   | 参数说明 | 备注 |
| -------- | -------- | ---- |
| role     | 用户角色 |      |
| state    | 用户状态 |      |
| _id      | 用户id   |      |
| email    | 用户邮箱 |      |
| password | 用户密码 |      |
| username | 用户昵称 |      |

- 响应数据

```json
{
    "status": 200,
    "message": "success",
    "data": {
        "role": 1,
        "state": 1,
        "_id": "5f546a47a65be332c8c4b5ca",
        "username": "yuling11234",
        "password": "$2b$10$m2/FSNbB/qG8ozaKn998z.RBCCrWFgBVOf0pu5N8KfeB2Xw0J/cCa",
        "email": "yuling111@163.com",
        "__v": 0
    }
}
```

#### 1.3.4. 修改用户状态

- 请求路径：users/:id/state/:type

- 请求方法：patch

- 请求参数

| 参数名 | 参数说明 | 备注                |
| ------ | -------- | ------------------- |
| id     | 用户id   | 不能为空，放在URL中 |
| type   | 用户状态 | 不能为空，放在URL中 |

- 响应参数

| 参数名   | 参数说明 | 备注 |
| -------- | -------- | ---- |
| role     | 用户角色 |      |
| state    | 用户状态 |      |
| _id      | 用户id   |      |
| email    | 用户邮箱 |      |
| password | 用户密码 |      |
| username | 用户昵称 |      |

- 响应数据

```json
{
    "status": 200,
    "message": "success",
    "data": {
        "role": 1,
        "state": 0,
        "_id": "5f546a47a65be332c8c4b5ca",
        "username": "yuling11234",
        "password": "$2b$10$m2/FSNbB/qG8ozaKn998z.RBCCrWFgBVOf0pu5N8KfeB2Xw0J/cCa",
        "email": "yuling111@163.com",
        "__v": 0
    }
}
```

#### 1.3.5. 删除用户

- 请求路径：users/:id

- 请求方法：delete

- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| id     | 用户id   | 不能为空 |

- 响应参数



- 响应数据

```json
{
    "meta": {
        "status": 200,
        "message": "success"
    },
    "data": {
        "role": null,
        "state": null,
        "_id": "5f5469fca65be332c8c4b5c7",
        "username": null,
        "password": "$2b$10$ytzZMd8nU4thaem6SIAL3.KGUy9RqKxaaef3mX0ZCaY3ac0SXUnQK",
        "email": "yuling123123456@163.com",
        "__v": 0
    }
}
```

### 1.4 文章管理

#### 1.4.1 文章数据列表

- 请求路径：articles

- 请求方法：get

- 请求参数

| 参数名   | 参数说明         | 备注     |
| -------- | ---------------- | -------- |
| pageNum  | 当前页码         | 【可选】 |
| pageSize | 每页显示多少数据 | 【可选】 |

- 响应参数

| 参数名    | 参数说明           | 备注 |
| --------- | ------------------ | ---- |
| articles  | 文章数据集合       |      |
| pageNum   | 当前第几页         |      |
| total     | 文章数据总数       |      |
| pageSize  | 每页显示多少条数据 |      |
| pageCount | 页码总数           |      |

- 响应数据

```json
{
    "meta": {
        "status": 200,
        "message": "success"
    },
    "data": {
        "articles": [
            {
                "cover": "",
                "classify": "后端",
                "tag": [
                    "测试"
                ],
                "view": 2,
                "comments": 0,
                "description": "我是测试文章",
                "_id": "5f599739a9f09f0a64eeddcd",
                "title": "我是测试文章",
                "content": "我是测试文章我是测试文章我是测试文章我是测试文章我是测试文章我是测试文章我是测试文章",
                "isPublish": true,
                "publishDate": "2020-09-10T03:02:17.439Z",
                "__v": 0,
                "isHot": true
            },
            {
                "cover": "",
                "classify": "UI",
                "tag": [
                    "测试"
                ],
                "view": 2,
                "comments": 0,
                "description": "我是测试文章1",
                "_id": "5f5997afa9f09f0a64eeddce",
                "title": "我是测试文章1",
                "content": "我是测试文章",
                "isPublish": true,
                "publishDate": "2020-09-10T03:04:15.994Z",
                "__v": 0,
                "isHot": true
            }
        ],
        "pageNum": 2,
        "total": 22,
        "pageSize": 2,
        "pageCount": 11
    }
}
```

#### 1.4.2  根据ID查询文章信息

- 请求路径：articles/:id

- 请求方法：get

请求参数

| 参数名 | 参数说明 | 备注                |
| ------ | -------- | ------------------- |
| id     | 文章id   | 放在URL中，不能为空 |

响应参数

| 参数名      | 参数说明     | 备注     |
| ----------- | ------------ | -------- |
| cover       | 封面图片链接 | 【可选】 |
| classify    | 分类         |          |
| tag         | 标签         |          |
| view        | 阅读人数     |          |
| comments    | 评论数       |          |
| description | 文章描述     |          |
| _id         | 文章id       |          |
| title       | 文章标题     |          |
| content     | 文章内容     |          |
| isPublish   | 是否发布     |          |
| publishDate | 发布日期     |          |
| isHot       | 是否推荐     |          |

响应数据

```json
{
    "status": 200,
    "message": "success",
    "data": {
        "cover": "",
        "classify": "UI",
        "tag": [
            "测试"
        ],
        "view": 0,
        "comments": 0,
        "description": "我是测试文章",
        "_id": "5f599c1fa9f09f0a64eeddd9",
        "title": "我是测试文章",
        "content": "我是测试文章",
        "isPublish": true,
        "publishDate": "2020-09-10T03:23:11.062Z",
        "__v": 0,
        "isHot": true
    }
}
```

#### 1.4.3  更新文章状态

请求路径：users/:id

请求方法：patch

请求参数

| 参数名    | 参数说明 | 备注                |
| --------- | -------- | ------------------- |
| isPublish | 是否发布 | true false 不能为空 |
| isHot     | 是否推荐 | true false 不能为空 |

响应参数



响应数据

```json
{
    "status": 200,
    "message": "success",
    "data": {
        "cover": "",
        "classify": "UI",
        "tag": [
            "测试"
        ],
        "view": 0,
        "comments": 0,
        "description": "我是测试文章",
        "_id": "5f599c1fa9f09f0a64eeddd9",
        "title": "我是测试文章",
        "content": "我是测试文章",
        "isPublish": true,
        "publishDate": "2020-09-10T03:23:11.062Z",
        "__v": 0,
        "isHot": false
    }
}
```

#### 1.4.4 修改文章

- 请求路径：users/:id

- 请求方法：put

- 请求参数

| 参数名 | 参数说明     | 备注 |
| ------ | ------------ | ---- |
| query  | 修改参数信息 |      |

- 响应参数

| 参数名      | 参数说明     | 备注     |
| ----------- | ------------ | -------- |
| cover       | 封面图片链接 | 【可选】 |
| classify    | 分类         |          |
| tag         | 标签         |          |
| view        | 阅读人数     |          |
| comments    | 评论数       |          |
| description | 文章描述     |          |
| _id         | 文章id       |          |
| title       | 文章标题     |          |
| content     | 文章内容     |          |
| isPublish   | 是否发布     |          |
| publishDate | 发布日期     |          |
| isHot       | 是否推荐     |          |

- 响应数据

```json
{
    "status": 200,
    "message": "success",
    "data": {
        "cover": "",
        "classify": "UI",
        "tag": [
            "测试",
            "前端"
        ],
        "view": 0,
        "comments": 0,
        "description": "我是测试文章",
        "_id": "5f599c1fa9f09f0a64eeddd9",
        "title": "我是测试文章",
        "content": "我是测试文章",
        "isPublish": true,
        "publishDate": "2020-09-10T03:23:11.062Z",
        "__v": 0,
        "isHot": false
    }
}
```

#### 1.4.5 删除文章

- 请求路径：users/:id

- 请求方法：delete

- 请求参数

| 参数名 | 参数说明 | 备注                |
| ------ | -------- | ------------------- |
| id     | 文章id   | 放在URL中，不能为空 |

- 响应参数

- 响应数据

```json
{
    "status": 200,
    "message": "success",
    "data": {
        "cover": "",
        "classify": "UI",
        "tag": [
            "测试",
            "前端"
        ],
        "view": 0,
        "comments": 0,
        "description": "我是测试文章",
        "_id": "5f599c1fa9f09f0a64eeddd9",
        "title": "我是测试文章",
        "content": "我是测试文章",
        "isPublish": true,
        "publishDate": "2020-09-10T03:23:11.062Z",
        "__v": 0,
        "isHot": false
    }
}
```

### 1.5 分类管理

#### 1.5.1 文章分类列表

- 请求路径：categories

- 请求方法：get

- 请求参数

| 参数名   | 参数说明         | 备注     |
| -------- | ---------------- | -------- |
| pageNum  | 当前页码         | 【可选】 |
| pageSize | 每页显示多少数据 | 【可选】 |

- 响应参数

| 参数名     | 参数说明           | 备注 |
| ---------- | ------------------ | ---- |
| categories | 分类数据集合       |      |
| pageNum    | 当前第几页         |      |
| total      | 文章数据总数       |      |
| pageSize   | 每页显示多少条数据 |      |
| pageCount  | 页码总数           |      |

- 响应数据

```json
{
    "meta": {
        "status": 200,
        "message": "success"
    },
    "data": {
        "categories": [
            {
                "_id": "5f546a9ba65be332c8c4b5d4",
                "classify": "前端",
                "time": "2020-09-06T04:50:35.382Z",
                "__v": 0
            },
            {
                "_id": "5f546aa8a65be332c8c4b5d5",
                "classify": "后端",
                "time": "2020-09-06T04:50:48.630Z",
                "__v": 0
            },
            {
                "_id": "5f546aaea65be332c8c4b5d6",
                "classify": "测试",
                "time": "2020-09-06T04:50:54.992Z",
                "__v": 0
            },
            {
                "_id": "5f55787b24d0a60e60d6ffa6",
                "classify": "UI",
                "time": "2020-09-07T00:02:03.516Z",
                "__v": 0
            }
        ],
        "pageNum": 1,
        "total": 4,
        "pageSize": 10,
        "pageCount": 1
    }
}
```

#### 1.5.2  根据ID查询分类信息

- 请求路径：categories/:id

- 请求方法：get

- 请求参数

| 参数名 | 参数说明 | 备注                |
| ------ | -------- | ------------------- |
| id     | 文章id   | 放在URL中，不能为空 |

- 响应参数

| 参数名   | 参数说明 | 备注 |
| -------- | -------- | ---- |
| classify | 分类名称 |      |
| _id      | 分类id   |      |
| time     | 创建日期 |      |

响应数据

```json
{
    "status": 200,
    "message": "fail",
    "data": {
        "_id": "5f546a9ba65be332c8c4b5d4",
        "classify": "前端",
        "time": "2020-09-06T04:50:35.382Z",
        "__v": 0
    }
}
```

#### 1.5.3 修改分类

- 请求路径：categories/:id

- 请求方法：put

- 请求参数

| 参数名 | 参数说明     | 备注 |
| ------ | ------------ | ---- |
| query  | 修改参数信息 |      |

- 响应参数

| 参数名   | 参数说明 | 备注 |
| -------- | -------- | ---- |
| classify | 分类名称 |      |
| _id      | 分类id   |      |
| time     | 创建日期 |      |

- 响应数据

```json
{
    "status": 200,
    "message": "success",
    "data": {
        "_id": "5f546a9ba65be332c8c4b5d4",
        "classify": "前端1",
        "time": "2020-09-06T04:50:35.382Z",
        "__v": 0
    }
}
```

#### 1.5.4 删除文章

- 请求路径：categories/:id

- 请求方法：delete 

- 请求参数

| 参数名 | 参数说明 | 备注                |
| ------ | -------- | ------------------- |
| id     | 分类id   | 放在URL中，不能为空 |

- 响应参数

- 响应数据

```json
{
    "status": 200,
    "message": "success"
}
```

### 1.6 评论管理

#### 1.6.1 评论列表

- 请求路径：categories

- 请求方法：get

- 请求参数

| 参数名   | 参数说明         | 备注     |
| -------- | ---------------- | -------- |
| pageNum  | 当前页码         | 【可选】 |
| pageSize | 每页显示多少数据 | 【可选】 |

- 响应参数

| 参数名    | 参数说明           | 备注 |
| --------- | ------------------ | ---- |
| comments  | 评论数据集合       |      |
| pageNum   | 当前第几页         |      |
| total     | 文章数据总数       |      |
| pageSize  | 每页显示多少条数据 |      |
| pageCount | 页码总数           |      |

- 响应数据

```json
{
    "meta": {
        "status": 200,
        "message": "success"
    },
    "data": {
        "comments": [
            {
                "_id": "5f5b27055df6eb3284d1af0f",
                "aid": {
                    "cover": "",
                    "classify": "前端",
                    "tag": [
                        "js"
                    ],
                    "view": 65,
                    "comments": 6,
                    "description": "JavaScript输入输出语句为了方便信息的输入输出，JS中提供了一些输入输出语句，其常用的语句如下：",
                    "_id": "5f56e6aafb12a52a806562c6",
                    "title": "JavaScript输入输出语句",
                    "content": "...",
                    "isPublish": true,
                    "publishDate": "2020-09-08T02:04:26.603Z",
                    "__v": 0,
                    "isHot": true
                },
                "content": "我是评论",
                "email": "yuling@163.com",
                "nickname": "雨凌",
                "time": "2020-09-11T07:28:05.916Z",
                "__v": 0
            }
            ...
        ],
        "pageNum": 1,
        "total": 12,
        "pageSize": 10,
        "pageCount": 2
    }
}
```

#### 1.6.2  根据ID查询评论信息

- 请求路径：comments/:id

- 请求方法：get

- 请求参数

| 参数名 | 参数说明 | 备注                |
| ------ | -------- | ------------------- |
| id     | 评论id   | 放在URL中，不能为空 |

- 响应参数

| 参数名   | 参数说明     | 备注                              |
| -------- | ------------ | --------------------------------- |
| status   | 评论审核状态 | 0 未审核  1 审核通过 2 审核为通过 |
| _id      | 评论id       |                                   |
| aid      | 评论文章id   |                                   |
| content  | 评论内容     |                                   |
| email    | 评论人邮箱   |                                   |
| nickname | 评论人昵称   |                                   |
| time     | 创建日期     |                                   |

响应数据

```json
{
    "status": 200,
    "message": "fail",
    "data": {
        "status": 0,
        "_id": "5f5b32365df6eb3284d1af12",
        "aid": "5f56e6aafb12a52a806562c6",
        "content": "ces",
        "email": "111",
        "nickname": "b",
        "time": "2020-09-11T08:15:50.620Z",
        "__v": 0
    }
}
```

#### 1.6.3 审核评论

- 请求路径：comments/:id

- 请求方法：patch

- 请求参数

| 参数名 | 参数说明     | 备注 |
| ------ | ------------ | ---- |
| query  | 修改参数信息 |      |

- 响应参数

| 参数名   | 参数说明     | 备注                              |
| -------- | ------------ | --------------------------------- |
| status   | 评论审核状态 | 0 未审核  1 审核通过 2 审核为通过 |
| _id      | 评论id       |                                   |
| aid      | 评论文章id   |                                   |
| content  | 评论内容     |                                   |
| email    | 评论人邮箱   |                                   |
| nickname | 评论人昵称   |                                   |
| time     | 创建日期     |                                   |

- 响应数据

```json
{
    "status": 200,
    "message": "success",
    "data": {
        "status": 2,
        "_id": "5f5b32365df6eb3284d1af12",
        "aid": "5f56e6aafb12a52a806562c6",
        "content": "ces",
        "email": "111",
        "nickname": "b",
        "time": "2020-09-11T08:15:50.620Z",
        "__v": 0
    }
}
```

#### 1.6.4 删除评论

- 请求路径：comments/:id

- 请求方法：delete 

- 请求参数

| 参数名 | 参数说明 | 备注                |
| ------ | -------- | ------------------- |
| id     | 分类id   | 放在URL中，不能为空 |

- 响应参数

- 响应数据

```json
{
    "status": 200,
    "message": "success"
}
```

#### 1.6.5 回复评论（未完成）

### 1.7 友链管理

#### 1.7.1 获取友链列表

- 请求路径：friends

- 请求方法：get

- 请求参数

| 参数名   | 参数说明         | 备注     |
| -------- | ---------------- | -------- |
| pageNum  | 当前页码         | 【可选】 |
| pageSize | 每页显示多少数据 | 【可选】 |

- 响应参数

| 参数名    | 参数说明           | 备注 |
| --------- | ------------------ | ---- |
| friends   | 评论数据集合       |      |
| pageNum   | 当前第几页         |      |
| total     | 文章数据总数       |      |
| pageSize  | 每页显示多少条数据 |      |
| pageCount | 页码总数           |      |

- 响应数据

```json
{
    "meta": {
        "status": 200,
        "message": "success"
    },
    "data": {
        "friends": [
            {
                "_id": "5f54d5dcd6be5e17dcc7da34",
                "title": "测试",
                "url": "http://127.0.0.1:8080",
                "time": "2020-09-06T12:28:12.414Z",
                "__v": 0
            },
            {
                "_id": "5f54d6007b71b12034c41b36",
                "title": "测试1",
                "url": "http://127.0.0.1:8080",
                "time": "2020-09-06T12:28:48.132Z",
                "__v": 0
            },
            {
                "_id": "5f54d6017b71b12034c41b37",
                "title": "测试11",
                "url": "http://127.0.0.1:8080",
                "time": "2020-09-06T12:28:49.858Z",
                "__v": 0
            },
            {
                "_id": "5f54d6047b71b12034c41b38",
                "title": "测试112",
                "url": "http://127.0.0.1:8080",
                "time": "2020-09-06T12:28:52.284Z",
                "__v": 0
            },
            {
                "_id": "5f54d6067b71b12034c41b39",
                "title": "测试1122",
                "url": "http://127.0.0.1:8080",
                "time": "2020-09-06T12:28:54.127Z",
                "__v": 0
            },
            {
                "_id": "5f54d6087b71b12034c41b3a",
                "title": "测试11223",
                "url": "http://127.0.0.1:8080",
                "time": "2020-09-06T12:28:56.375Z",
                "__v": 0
            },
            {
                "_id": "5f54d60a7b71b12034c41b3b",
                "title": "测试112233",
                "url": "http://127.0.0.1:8080",
                "time": "2020-09-06T12:28:58.476Z",
                "__v": 0
            },
            {
                "_id": "5f54e7f724d0a60e60d6ffa2",
                "title": "测算",
                "url": "1111",
                "time": "2020-09-06T13:45:27.585Z",
                "__v": 0
            },
            {
                "_id": "5f54e84f24d0a60e60d6ffa3",
                "title": "得到",
                "url": "11111",
                "time": "2020-09-06T13:46:55.239Z",
                "__v": 0
            },
            {
                "_id": "5f54e88f24d0a60e60d6ffa4",
                "title": "风覅",
                "url": "11111",
                "time": "2020-09-06T13:47:59.651Z",
                "__v": 0
            }
        ],
        "pageNum": 1,
        "total": 12,
        "pageSize": 10,
        "pageCount": 2
    }
}
```

#### 1.7.2  根据ID查询评论信息

- 请求路径：friends/:id

- 请求方法：get

- 请求参数

| 参数名 | 参数说明 | 备注                |
| ------ | -------- | ------------------- |
| id     | 评论id   | 放在URL中，不能为空 |

- 响应参数

| 参数名      | 参数说明     | 备注                              |
| ----------- | ------------ | --------------------------------- |
| status      | 友链审核状态 | 0 未审核  1 审核通过 2 审核为通过 |
| _id         | 友链id       |                                   |
| description | 友链网站描述 |                                   |
| title       | 友链标题     |                                   |
| url         | 友链地址     |                                   |
| time        | 创建日期     |                                   |

响应数据

```json
{
    "status": 200,
    "message": "success",
    "data": {
        "description": "该网站还没有描述哦",
        "status": 0,
        "_id": "5f54d6007b71b12034c41b36",
        "title": "测试1",
        "url": "http://127.0.0.1:8080",
        "time": "2020-09-06T12:28:48.132Z",
        "__v": 0
    }
}
```

#### 1.7.3 审核友链

- 请求路径：friends/:id

- 请求方法：patch

- 请求参数

| 参数名 | 参数说明     | 备注 |
| ------ | ------------ | ---- |
| query  | 修改参数信息 |      |

- 响应参数

| 参数名      | 参数说明     | 备注                              |
| ----------- | ------------ | --------------------------------- |
| status      | 友链审核状态 | 0 未审核  1 审核通过 2 审核为通过 |
| _id         | 友链id       |                                   |
| description | 友链网站描述 |                                   |
| title       | 友链标题     |                                   |
| url         | 友链地址     |                                   |
| time        | 创建日期     |                                   |

- 响应数据

```json
{
    "status": 200,
    "message": "success",
    "data": {
        "description": "该网站还没有描述哦",
        "status": 2,
        "_id": "5f54d6007b71b12034c41b36",
        "title": "测试1",
        "url": "http://127.0.0.1:8080",
        "time": "2020-09-06T12:28:48.132Z",
        "__v": 0
    }
}
```

#### 1.7.4 删除友链

- 请求路径：friends/:id

- 请求方法：delete 

- 请求参数

| 参数名 | 参数说明 | 备注                |
| ------ | -------- | ------------------- |
| id     | 分类id   | 放在URL中，不能为空 |

- 响应参数

- 响应数据

```json
{
    "status": 200,
    "message": "删除成功"
}
```

### 1.8 图床管理

#### 1.8.1 获取图片列表

- 请求路径：friends

- 请求方法：get

- 请求参数

| 参数名   | 参数说明         | 备注     |
| -------- | ---------------- | -------- |
| pageNum  | 当前页码         | 【可选】 |
| pageSize | 每页显示多少数据 | 【可选】 |

- 响应参数

| 参数名    | 参数说明           | 备注 |
| --------- | ------------------ | ---- |
| images    | 图片数据集合       |      |
| pageNum   | 当前第几页         |      |
| total     | 文章数据总数       |      |
| pageSize  | 每页显示多少条数据 |      |
| pageCount | 页码总数           |      |

- 响应数据

```json
{
    "meta": {
        "status": 200,
        "message": "success"
    },
    "data": {
        "images": [
            {
                "view": 0,
                "_id": "5f71e61c4d154d2b9cc03be5",
                "title": "3",
                "img": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601309694201&di=c7b75808ca76a703c3a19ac403983020&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Faec379310a55b319de3f711a43a98226cefc179e.jpg",
                "description": "3",
                "time": "2020-09-28T13:33:16.871Z",
                "__v": 0
            },
            {
                "view": 0,
                "_id": "5f71e5a34d154d2b9cc03be4",
                "title": "4",
                "img": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601309694201&di=db5c2f04a42cc3f856a30d8aea2c6f0e&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F86%2F10%2F01300000184180121920108394217.jpg",
                "description": "4",
                "time": "2020-09-28T13:31:15.792Z",
                "__v": 0
            },
            {
                "view": 0,
                "_id": "5f71e4f24d154d2b9cc03be2",
                "title": "2",
                "img": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601309694202&di=c87321796669c73da94463a01dc2626f&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F22%2F59%2F19300001325156131228593878903.jpg",
                "description": "2",
                "time": "2020-09-28T13:28:18.975Z",
                "__v": 0
            },
            {
                "view": 0,
                "_id": "5f71e4a54d154d2b9cc03be1",
                "title": "1",
                "img": "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1601299607&di=82c23dc2bea91d8cba3128526caf4a07&src=http://a2.att.hudong.com/36/48/19300001357258133412489354717.jpg",
                "description": "1",
                "time": "2020-09-28T13:27:01.340Z",
                "__v": 0
            }
        ],
        "pageNum": 1,
        "total": 4,
        "pageSize": 10,
        "pageCount": 1
    }
}
```

#### 1.8.2  根据ID查询评论信息

- 请求路径：images/:id

- 请求方法：get

- 请求参数

| 参数名 | 参数说明 | 备注                |
| ------ | -------- | ------------------- |
| id     | 评论id   | 放在URL中，不能为空 |

- 响应参数

| 参数名      | 参数说明     | 备注                                       |
| ----------- | ------------ | ------------------------------------------ |
| status      | 图片审核状态 | 0 未审核  1 审核通过 2 审核为通过          |
| _id         | 图片id       |                                            |
| description | 友链网站描述 |                                            |
| title       | 友链标题     |                                            |
| img         | 友链地址     | 暂时只支持上传图片地址，不支持直接上传图片 |
| time        | 创建日期     |                                            |

响应数据

```json
{
    "status": 200,
    "message": "success",
    "data": {
        "view": 0,
        "status": 0,
        "_id": "5f71e4a54d154d2b9cc03be1",
        "title": "1",
        "img": "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1601299607&di=82c23dc2bea91d8cba3128526caf4a07&src=http://a2.att.hudong.com/36/48/19300001357258133412489354717.jpg",
        "description": "1",
        "time": "2020-09-28T13:27:01.340Z",
        "__v": 0
    }
}
```

#### 1.8.3 审核图片

- 请求路径：images/:id

- 请求方法：patch

- 请求参数

| 参数名 | 参数说明     | 备注 |
| ------ | ------------ | ---- |
| query  | 修改参数信息 |      |

- 响应参数

| 参数名      | 参数说明     | 备注                                       |
| ----------- | ------------ | ------------------------------------------ |
| status      | 图片审核状态 | 0 未审核  1 审核通过 2 审核为通过          |
| _id         | 图片id       |                                            |
| description | 友链网站描述 |                                            |
| title       | 友链标题     |                                            |
| img         | 友链地址     | 暂时只支持上传图片地址，不支持直接上传图片 |
| time        | 创建日期     |                                            |

- 响应数据

```json
{
    "status": 200,
    "message": "success",
    "data": {
        "view": 0,
        "status": 2,
        "_id": "5f71e4a54d154d2b9cc03be1",
        "title": "1",
        "img": "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1601299607&di=82c23dc2bea91d8cba3128526caf4a07&src=http://a2.att.hudong.com/36/48/19300001357258133412489354717.jpg",
        "description": "1",
        "time": "2020-09-28T13:27:01.340Z",
        "__v": 0
    }
}
```

#### 1.8.4 删除图片

- 请求路径：images/:id

- 请求方法：delete 

- 请求参数

| 参数名 | 参数说明 | 备注                |
| ------ | -------- | ------------------- |
| id     | 分类id   | 放在URL中，不能为空 |

- 响应参数

- 响应数据

```json
{
    "status": 200,
    "message": "success"
}
```

#### 1.8.5 修改图片信息

- 请求路径：images/:id

- 请求方法：put

- 请求参数

| 参数名 | 参数说明     | 备注 |
| ------ | ------------ | ---- |
| query  | 修改参数信息 |      |

- 响应参数

| 参数名      | 参数说明     | 备注                                       |
| ----------- | ------------ | ------------------------------------------ |
| status      | 图片审核状态 | 0 未审核  1 审核通过 2 审核为通过          |
| _id         | 图片id       |                                            |
| description | 友链网站描述 |                                            |
| title       | 友链标题     |                                            |
| img         | 友链地址     | 暂时只支持上传图片地址，不支持直接上传图片 |
| time        | 创建日期     |                                            |

- 响应数据

```json
{
    "status": 200,
    "message": "success",
    "data": {
        "view": 0,
        "status": 2,
        "_id": "5f71e4a54d154d2b9cc03be1",
        "title": "1",
        "img": "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1601299607&di=82c23dc2bea91d8cba3128526caf4a07&src=http://a2.att.hudong.com/36/48/19300001357258133412489354717.jpg",
        "description": "1111",
        "time": "2020-09-28T13:27:01.340Z",
        "__v": 0
    }
}
```



### 1.9 佳句管理

#### 1.9.1 获取佳句列表

- 请求路径：friends

- 请求方法：get

- 请求参数

| 参数名   | 参数说明         | 备注     |
| -------- | ---------------- | -------- |
| pageNum  | 当前页码         | 【可选】 |
| pageSize | 每页显示多少数据 | 【可选】 |

- 响应参数

| 参数名    | 参数说明           | 备注 |
| --------- | ------------------ | ---- |
| centence  | 图片数据集合       |      |
| pageNum   | 当前第几页         |      |
| total     | 文章数据总数       |      |
| pageSize  | 每页显示多少条数据 |      |
| pageCount | 页码总数           |      |

- 响应数据

```json
{
    "meta": {
        "status": 200,
        "message": "success"
    },
    "data": {
        "sentence": [
            {
                "_id": "5f6840c863984f46acfdd776",
                "title": "欲买桂花同载酒，终不似少年游",
                "time": "2020-09-21T05:57:28.154Z",
                "__v": 0
            },
            {
                "_id": "5f683726c1617718106adf41",
                "title": "唯有南风旧相识，偷开门口又翻书",
                "time": "2020-09-21T05:16:22.277Z",
                "__v": 0
            },
            {
                "_id": "5f68370bc1617718106adf40",
                "title": "白茶清欢无别事，我在等风也等你",
                "time": "2020-09-21T05:15:55.521Z",
                "__v": 0
            },
            {
                "_id": "5f6836e1c1617718106adf3f",
                "title": "我是檐上三月雪，你是人间惊鸿客",
                "time": "2020-09-21T05:15:13.414Z",
                "__v": 0
            },
            {
                "_id": "5f6836dec1617718106adf3e",
                "title": "空城永远空城，基于对年少初梦的敬重",
                "time": "2020-09-21T05:15:10.350Z",
                "__v": 0
            }
        ],
        "pageNum": 1,
        "total": 5,
        "pageSize": 10,
        "pageCount": 1
    }
}
```

#### 1.9.2  根据ID查询佳句信息

- 请求路径：images/:id

- 请求方法：get

- 请求参数

| 参数名 | 参数说明 | 备注                |
| ------ | -------- | ------------------- |
| id     | 评论id   | 放在URL中，不能为空 |

- 响应参数

| 参数名 | 参数说明     | 备注                              |
| ------ | ------------ | --------------------------------- |
| status | 佳句审核状态 | 0 未审核  1 审核通过 2 审核为通过 |
| _id    | 佳句id       |                                   |
| title  | 佳句内容     |                                   |
| time   | 创建日期     |                                   |

响应数据

```json
{
    "status": 200,
    "message": "success",
    "data": {
        "status": 0,
        "_id": "5f6836dec1617718106adf3e",
        "title": "空城永远空城，基于对年少初梦的敬重",
        "time": "2020-09-21T05:15:10.350Z",
        "__v": 0
    }
}
```

#### 1.9.3 审核图片

- 请求路径：images/:id

- 请求方法：patch

- 请求参数

| 参数名 | 参数说明     | 备注 |
| ------ | ------------ | ---- |
| query  | 修改参数信息 |      |

- 响应参数

| 参数名 | 参数说明     | 备注                              |
| ------ | ------------ | --------------------------------- |
| status | 佳句审核状态 | 0 未审核  1 审核通过 2 审核为通过 |
| _id    | 佳句id       |                                   |
| title  | 佳句内容     |                                   |
| time   | 创建日期     |                                   |

- 响应数据

```json
{
    "status": 200,
    "message": "success",
    "data": {
        "status": 2,
        "_id": "5f6836dec1617718106adf3e",
        "title": "空城永远空城，基于对年少初梦的敬重",
        "time": "2020-09-21T05:15:10.350Z",
        "__v": 0
    }
}
```

#### 1.9.4 删除佳句

- 请求路径：centences/:id

- 请求方法：delete 

- 请求参数

| 参数名 | 参数说明 | 备注                |
| ------ | -------- | ------------------- |
| id     | 分类id   | 放在URL中，不能为空 |

- 响应参数

- 响应数据

```json
{
    "status": 200,
    "message": "success"
}
```

#### 1.9.5 修改佳句信息

- 请求路径：centences/:id

- 请求方法：put

- 请求参数

| 参数名 | 参数说明     | 备注 |
| ------ | ------------ | ---- |
| query  | 修改参数信息 |      |

- 响应参数

| 参数名 | 参数说明     | 备注                              |
| ------ | ------------ | --------------------------------- |
| status | 佳句审核状态 | 0 未审核  1 审核通过 2 审核为通过 |
| _id    | 佳句id       |                                   |
| title  | 佳句内容     |                                   |
| time   | 创建日期     |                                   |

- 响应数据

```json
{
    "status": 200,
    "message": "success",
    "data": {
        "status": 2,
        "_id": "5f6836dec1617718106adf3e",
        "title": "空城永远空城，基于对年少初梦的敬重111",
        "time": "2020-09-21T05:15:10.350Z",
        "__v": 0
    }
}
```

#### 1.9.6 新增佳句

- 请求路径：users


- 请求方法：post


- 请求参数:

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| title  | 佳句内容 |          |
| status | 参数状态 | 【可选】 |

- 响应参数：

| 参数名 | 参数说明     | 备注                              |
| ------ | ------------ | --------------------------------- |
| status | 佳句审核状态 | 0 未审核  1 审核通过 2 审核为通过 |
| _id    | 佳句id       |                                   |
| title  | 佳句内容     |                                   |
| time   | 创建日期     |                                   |

- 响应数据：

```json
{
    "status": 200,
    "message": "success",
    "data": {
        "status": 0,
        "_id": "5fe87ec66754d03a0c600762",
        "title": "空城永远空城，基于对年少初梦的敬重1111",
        "time": "2020-12-27T12:32:06.920Z",
        "__v": 0
    }
}
```

### 1.10 轮播管理

#### 1.10.1 获取轮播列表

- 请求路径：swipers

- 请求方法：get

- 请求参数

| 参数名   | 参数说明         | 备注     |
| -------- | ---------------- | -------- |
| pageNum  | 当前页码         | 【可选】 |
| pageSize | 每页显示多少数据 | 【可选】 |

- 响应参数

| 参数名    | 参数说明           | 备注 |
| --------- | ------------------ | ---- |
| swipers   | 轮播图数据集合     |      |
| pageNum   | 当前第几页         |      |
| total     | 文章数据总数       |      |
| pageSize  | 每页显示多少条数据 |      |
| pageCount | 页码总数           |      |

- 响应数据

```json
{
    "meta": {
        "status": 200,
        "message": "success"
    },
    "data": {
        "swipers": [
            {
                "status": 0,
                "_id": "5f61b94890370e3154e6af41",
                "img": "http://images.bianxiaofeng.com/ced846eab08578468670a87333e05b5f.jpg",
                "url": "http://127.0.0.1:8081/#/article?id=5f61a309979b11200c587bc3",
                "description": "测试1111",
                "time": "2020-09-16T07:05:44.934Z",
                "__v": 0
            },
            {
                "status": 0,
                "_id": "5f61b502c4620b3378fca0a1",
                "img": "https://cn.bing.com/th?id=OHR.NYEBacknang_ZH-CN6301969939_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp",
                "url": "http://127.0.0.1:8081/#/",
                "description": "测试12345",
                "time": "2020-09-16T06:47:30.517Z",
                "__v": 0
            }
        ],
        "pageNum": 1,
        "total": 2,
        "pageSize": 10,
        "pageCount": 1
    }
}
```

#### 1.10.2  根据ID查询轮播图信息

- 请求路径：swipers/:id

- 请求方法：get

- 请求参数

| 参数名 | 参数说明 | 备注                |
| ------ | -------- | ------------------- |
| id     | 评论id   | 放在URL中，不能为空 |

- 响应参数

| 参数名      | 参数说明   | 备注                                     |
| ----------- | ---------- | ---------------------------------------- |
| status      | 轮播图状态 | 0 未上线 1已上线                         |
| _id         | 轮播图id   |                                          |
| img         | 轮播图地址 | 暂时只能上传图片地址，不支持直接上传图片 |
| url         | 跳转地址   |                                          |
| description | 轮播图标题 |                                          |
| time        | 创建时间   |                                          |

响应数据

```json
{
    "status": 200,
    "message": "success",
    "swiper": {
        "status": 0,
        "_id": "5f61b502c4620b3378fca0a1",
        "img": "https://cn.bing.com/th?id=OHR.NYEBacknang_ZH-CN6301969939_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp",
        "url": "http://127.0.0.1:8081/#/",
        "description": "测试12345",
        "time": "2020-09-16T06:47:30.517Z",
        "__v": 0
    }
}
```

#### 1.10.3 审核轮播图

- 请求路径：swipers/:id

- 请求方法：patch

- 请求参数

| 参数名 | 参数说明     | 备注 |
| ------ | ------------ | ---- |
| query  | 修改参数信息 |      |

- 响应参数

| 参数名      | 参数说明   | 备注                                     |
| ----------- | ---------- | ---------------------------------------- |
| status      | 轮播图状态 | 0 未上线 1已上线                         |
| _id         | 轮播图id   |                                          |
| img         | 轮播图地址 | 暂时只能上传图片地址，不支持直接上传图片 |
| url         | 跳转地址   |                                          |
| description | 轮播图标题 |                                          |
| time        | 创建时间   |                                          |

- 响应数据

```json
{
    "status": 200,
    "message": "success",
    "data": {
        "status": 1,
        "_id": "5f61b502c4620b3378fca0a1",
        "img": "https://cn.bing.com/th?id=OHR.NYEBacknang_ZH-CN6301969939_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp",
        "url": "http://127.0.0.1:8081/#/",
        "description": "测试12345",
        "time": "2020-09-16T06:47:30.517Z",
        "__v": 0
    }
}
```

#### 1.10.4 删除佳句

- 请求路径：swipers/:id

- 请求方法：delete 

- 请求参数

| 参数名 | 参数说明 | 备注                |
| ------ | -------- | ------------------- |
| id     | 分类id   | 放在URL中，不能为空 |

- 响应参数

- 响应数据

```json
{
    "status": 200,
    "message": "success"
}
```

#### 1.10.5 修改佳句信息

- 请求路径：swipers/:id

- 请求方法：put

- 请求参数

| 参数名 | 参数说明     | 备注 |
| ------ | ------------ | ---- |
| query  | 修改参数信息 |      |

- 响应参数

| 参数名      | 参数说明   | 备注                                     |
| ----------- | ---------- | ---------------------------------------- |
| status      | 轮播图状态 | 0 未上线 1已上线                         |
| _id         | 轮播图id   |                                          |
| img         | 轮播图地址 | 暂时只能上传图片地址，不支持直接上传图片 |
| url         | 跳转地址   |                                          |
| description | 轮播图标题 |                                          |
| time        | 创建时间   |                                          |

- 响应数据

```json
{
    "status": 200,
    "message": "success",
    "swiper": {
        "status": 1,
        "_id": "5f61b502c4620b3378fca0a1",
        "img": "https://cn.bing.com/th?id=OHR.NYEBacknang_ZH-CN6301969939_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp",
        "url": "http://127.0.0.1:8081/#/",
        "description": "1111",
        "time": "2020-09-16T06:47:30.517Z",
        "__v": 0
    }
}
```

#### 1.10.6 新增轮播图

- 请求路径：swipers

- 请求方法：post

- 请求参数:

| 参数名      | 参数说明   | 备注                                     |
| ----------- | ---------- | ---------------------------------------- |
| img         | 图片地址   | 暂时只能上传图片地址，不支持直接上传图片 |
| url         | 跳转地址   |                                          |
| status      | 参数状态   | 【可选】                                 |
| description | 轮播图标题 | 【可选】                                 |

- 响应参数：

| 参数名      | 参数说明   | 备注                                     |
| ----------- | ---------- | ---------------------------------------- |
| status      | 轮播图状态 | 0 未上线 1已上线                         |
| _id         | 轮播图id   |                                          |
| img         | 轮播图地址 | 暂时只能上传图片地址，不支持直接上传图片 |
| url         | 跳转地址   |                                          |
| description | 轮播图标题 |                                          |
| time        | 创建时间   |                                          |

- 响应数据：

```json
{
    "status": 200,
    "message": "success",
    "swiper": {
        "status": 0,
        "_id": "5fe884318a451048a482fce8",
        "url": "http://127.0.0.1:8081/#/",
        "img": "https://cn.bing.com/th?id=OHR.NYEBacknang_ZH-CN6301969939_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp",
        "time": "2020-12-27T12:55:13.173Z",
        "__v": 0
    }
}
```





