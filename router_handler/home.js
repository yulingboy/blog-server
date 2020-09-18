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
// 导入留言集合
const Message = require("../models/message");
const Swiper = require("../models/swiper");
// 导入用于生成JWT字符串的包
const jwt = require('jsonwebtoken');

// 获取文章列表
exports.articles = async (req, res) => {
  // 接收客户端传来的当前页参数
  let page = req.query.currentPage || 1;
  // 每一页显示的数据条数
  // let pages = req.query.pageSize;
  let pageSize = 10;
  // 查询用户数据的总数
  let count = await Article.countDocuments({ isPublish: true });
  //总页数
  let total = Math.ceil(count / pageSize);
  // res.send(total);
  // return;
  //页码对应的数据查询开始位置
  let start = (page - 1) * pageSize;
  // 从数据库中查询用户
  let article = await Article.find({ isPublish: true }).limit(pageSize).skip(start).sort({publishDate: -1});
  if (!article) {
    return res.send({
      status: 400,
      message: "获取文章信息失败",
    })
  }else{
      // 定义 secret 密钥，建议将密钥命名为 secretKey
      // const secretKey = 'hello yuling'
      // 在登录成功之后，调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
      // const tokenStr = 'Bearer ' + jwt.sign({ username: req.body.username }, secretKey, { expiresIn: 600 * 24 * 3 })
      res.send({
        status: 200,
        message: "获取文章信息成功",
        article: article,
        page: page,
        total: total,
        pageSize: pageSize,
        count: count
      })
  } 
}
// 获取文章详情
exports.article = async (req, res) => {
    // console.log(req.query);
    const count = await Article.find({_id: req.query.id})
    count[0].view += 1;
    // console.log(count[0].view); 
    const article = await Article.findOneAndUpdate({_id: req.query.id}, {$set: {view: count[0].view}}, {new: true})
    // const cpount =
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
// 获取文章分类
exports.classifylist = async (req, res) => {
  const classifylist = await Classify.find({});
  // const count = await Article.find({ classify: req.query.classify, isPublish: true });
  if (classifylist.length<=0) {
    return res.send({
      status: 400,
      message:'获取文章分类失败'
    })
  } else {
    res.send({
      status: 200,
      message:'获取文章分类成功',
      classifylist:classifylist
    })
  }
}
// 获取分类文章列表
exports.classifyarticle = async (req, res) => {
  // 接收客户端传来的当前页参数
  let page = req.query.currentPage || 1;
  // 每一页显示的数据条数
  // let pages = req.query.pageSize;
  let pageSize = 10;
  // 查询用户数据的总数
  let count = await Article.countDocuments({ classify: req.query.classify, isPublish: true });
  //总页数
  let total = Math.ceil(count / pageSize);
  // res.send(total);
  // return;
  //页码对应的数据查询开始位置
  let start = (page - 1) * pageSize;
  // 从数据库中查询用户
  let article = await Article.find({ classify: req.query.classify, isPublish: true }).limit(pageSize).skip(start).sort({publishDate: -1});
  if (!article) {
    return res.send({
      status: 400,
      message: "获取文章信息失败",
    })
  }else{
      // 定义 secret 密钥，建议将密钥命名为 secretKey
      // const secretKey = 'hello yuling'
      // 在登录成功之后，调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
      // const tokenStr = 'Bearer ' + jwt.sign({ username: req.body.username }, secretKey, { expiresIn: 600 * 24 * 3 })
      res.send({
        status: 200,
        message: "获取文章信息成功",
        article: article,
        page: page,
        total: total,
        pageSize: pageSize,
        count: count
      })
  } 
  // console.log(req.query.classify);
  // const article = await Article.find({ classify: req.query.classify, isPublish: true });
  // console.log(article)
  // if (!article) {
  //   return res.send({
  //     status: 400,
  //     message: "获取文章信息失败",
  //   })
  // }else{
  //     res.send({
  //       status: 200,
  //       message: "获取文章信息成功",
  //       article: article
  //     })
  // }
}
// 发表评论
exports.comment = async (req, res) => {
  console.log(req.body);
  const { aid, content, email, nickname } = req.body;
  const comment = await Comment.create({
    aid: aid,
    // uid: uid,
    content: content,
    email: email,
    nickname: nickname
  })
  if (!comment) {
    return res.send({
      status: 400,
      message:'发表评论失败'
    })
  } else {
    res.send({
      status: 200,
      message: '发表评论成功',
      comment: comment
    })
  }
}
//查询评论列表
exports.commentlist = async (req, res) => {
  // console.log(req.query);
  const counts = await Comment.countDocuments({aid: req.query.aid});
  await Article.findOneAndUpdate({_id:req.query.aid}, {$set: {comments: counts}}, {new: true})
  let comments = await Comment.find({aid: req.query.aid}).sort({time: -1});
  // console.log(counts);
  res.send({
    comments: comments
  });
}
//查询热门文章
exports.gethotarticle = async (req, res) => {
  // console.log(req.query);
  let article = await Article.find({isPublish: true, isHot: true});
  // console.log(comments);
  res.send({
    article: article
  });
}

// 发表留言
exports.message = async (req, res) => {
  console.log(req.body);
  const { content, email, nickname } = req.body;
  const message = await Message.create({
    // aid: aid,
    // uid: uid,
    content: content,
    email: email,
    nickname: nickname
  })
  if (!message) {
    return res.send({
      status: 400,
      message:'发表留言失败'
    })
  } else {
    res.send({
      status: 200,
      message: '发表留言成功',
      message: message
    })
  }
}
//查询留言列表
exports.messagelist = async (req, res) => {
  // console.log(req.query);
  // const counts = await Comment.countDocuments({aid: req.query.aid});
  // await Article.findOneAndUpdate({_id:req.query.aid}, {$set: {comments: counts}}, {new: true})
  const message = await Message.find({}).sort({time: -1})
  // let comments = await Comment.find({aid: req.query.aid});
  // console.log(counts);
  res.send({
    message: message
  });
}

// 交换友链
exports.friendly = async (req, res) => {
  console.log(req.body);
  const { description, url, title } = req.body;
  const friendly = await Friendly.create({
    // aid: aid,
    // uid: uid,
    description: description,
    url: url,
    title: title
  })
  if (!friendly) {
    return res.send({
      status: 400,
      message:'发表留言失败'
    })
  } else {
    res.send({
      status: 200,
      message: '发表留言成功',
      friendly: friendly
    })
  }
}
//查询友链列表
exports.friendlylist = async (req, res) => {
  // console.log(req.query);
  // const counts = await Comment.countDocuments({aid: req.query.aid});
  // await Article.findOneAndUpdate({_id:req.query.aid}, {$set: {comments: counts}}, {new: true})
  const friendly = await Friendly.find({}).sort({time: -1})
  // let comments = await Comment.find({aid: req.query.aid});
  // console.log(fr);
  res.send({
    friendly: friendly
  });
}

//查询轮播图列表
exports.swiperlist = async (req, res) => {
  // console.log(req.query);
  // const counts = await Comment.countDocuments({aid: req.query.aid});
  // await Article.findOneAndUpdate({_id:req.query.aid}, {$set: {comments: counts}}, {new: true})
  const swiper = await Swiper.find({}).sort({time: -1})
  // let comments = await Comment.find({aid: req.query.aid});
  // console.log(fr);
  res.send({
    swiper: swiper
  });
}