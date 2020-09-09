// 引入用户集合
const User = require("../models/user");
// 导入文章分类集合
const Classify = require("../models/classify");
//导入文章集合
const Article = require("../models/article");
//导入评论集合
const Comment = require("../models/comment");
//导入友情链接集合
const Friendly = require("../models/friendly");
// 导入用于生成JWT字符串的包
const jwt = require('jsonwebtoken');

exports.articles = async (req, res) => {
  const article = await Article.find({ isPublish: true });
  // console.log(article)
  if (!article) {
    return res.send({
      status: 400,
      message: "获取文章信息失败",
    })
  }else{
      // 定义 secret 密钥，建议将密钥命名为 secretKey
      const secretKey = 'hello yuling'
      // 在登录成功之后，调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
      const tokenStr = 'Bearer ' + jwt.sign({ username: req.body.username }, secretKey, { expiresIn: 600 * 24 * 3 })
      res.send({
        status: 200,
        message: "获取文章信息成功",
        article: article,
        token: tokenStr
      })
  }
}
exports.article = async (req, res) => {
    // console.log(req.query);
    const article = await Article.find({_id: req.query.id})
    // console.log(article);
    if (!article) {
        return res.send({
          status: 400,
          message: "获取文章信息失败",
        })
      }else{
          res.send({
            status: 200,
            message: "获取文章信息成功",
            article: article
          })
      }
}
