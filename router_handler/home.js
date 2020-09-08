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

exports.articles = async (req, res) => {
  const article = await Article.find({ isPublish: true });
  // console.log(article)
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
