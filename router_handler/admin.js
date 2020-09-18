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
const Swiper = require("../models/swiper");
// 引入bcrypt模块
const bcrypt = require("bcrypt");
// 导入用于生成JWT字符串的包
const jwt = require("jsonwebtoken");
const svgCaptcha = require("svg-captcha");

// const express = require("express");

// const { findByIdAndUpdate } = require('../models/user');

exports.captcha = (req, res) => {
 const captcha = svgCaptcha.create({
  color: true,
  noise: 2,
  ignoreChars: "0o1il",
  size: 4,
  height: 40,
  width: 140,
 });
 req.session.captcha = captcha.text.toLocaleLowerCase();
 // req.session.setItem(captcha,'captcha.text.toLocaleLowerCase()')
//  console.log(req.session);
  // res.setHeader("Content-Type","image/svg+xml; charset=UTF-8");
  // res.setHeader("Access-Control-Max-Age", "3600");
  // res.setHeader("content-length", captcha.data.length );
//  res.setHeaders{"Content-Type": "image/svg+xml; charset=UTF-8"};
 res.type("svg");
//  res.type('html');
//  res.status(200).send(captcha.data);
 res.send({
   data: captcha.data,
   text: captcha.text.toLocaleLowerCase()
 })
};

// 用户注册
exports.reg = async (req, res) => {
 // 将用户信息结构出来
 const { username, password, email } = req.body;
 // 根据用户邮箱查询是否存在
 const user = await User.findOne({ email: email });
 if (user) {
  //如果邮箱已经注册过
  //向客户端发送信息
  return res.send({
   status: 400,
   message: "邮箱地址被占用",
  });
 } else {
  //邮箱没有被占用
  //  对密码进行加密处理

  // 生成随机字符串
  const salt = await bcrypt.genSalt(10);
  // 加密
  const password = await bcrypt.hash(req.body.password, salt);
  // 替换
  req.body.password = password;
  // 创建新用户
  // await User.create({ username: username, password: password, email: email });
  await User.create(req.body);
  //向客户端发送信息
  res.send({
   status: 200,
   message: "注册用户成功",
  });
 }
};
// 用户登录
exports.login = async (req, res) => {
 // 将用户信息结构出来
 const { username, password, email, captcha } = req.body;
//  console.log(req.session)
//  console.log(captcha + '+++' + req.session.captcha);
//  console.log(req.session.captcha);
 // 根据用户邮箱查询是否存在
 const user = await User.findOne({ email: email });
 // 比对密码是否正确
 const isVaild = await bcrypt.compare(req.body.password, user.password);
 if (!isVaild) {
  //密码错误
  return res.send({
   status: 400,
   message: "密码错误",
  });
 } else {
  //密码正确

  // 定义 secret 密钥，建议将密钥命名为 secretKey
  const secretKey = "hello yuling";
  // 在登录成功之后，调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
  const tokenStr =
   "Bearer " +
   jwt.sign({ username: req.body.username }, secretKey, {
    expiresIn: 600 * 24 * 3,
   });
  res.send({
   status: 200,
   message: "登录成功！",
   token: tokenStr, // 要发送给客户端的 token 字符串
  });

  // if (req.session.captcha !== captcha) {
  //  return res.send({
  //   status: 400,
  //   message: "验证码错误",
  //  });
  // } else {
  //  // 定义 secret 密钥，建议将密钥命名为 secretKey
  //  const secretKey = "hello yuling";
  //  // 在登录成功之后，调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
  //  const tokenStr =
  //   "Bearer " +
  //   jwt.sign({ username: req.body.username }, secretKey, {
  //    expiresIn: 600 * 24 * 3,
  //   });
  //  res.send({
  //   status: 200,
  //   message: "登录成功！",
  //   token: tokenStr, // 要发送给客户端的 token 字符串
  //  });
  // }
 }
};
// 用户数据
exports.userlist = async (req, res) => {
 // console.log(req.query.pageSize);
 // 接收客户端传来的当前页参数
 let page = req.query.currentPage || 1;
 // 每一页显示的数据条数
 // let pages = req.query.pageSize;
 let pageSize = 4;
 // 查询用户数据的总数
 let count = await User.countDocuments({});
 //总页数
 let total = Math.ceil(count / pageSize);
 // res.send(total);
 // return;
 //页码对应的数据查询开始位置
 let start = (page - 1) * pageSize;
 // 从数据库中查询用户
 let users = await User.find({}).limit(pageSize).skip(start);
 res.send({
  users: users,
  page: page,
  total: total,
  pageSize: pageSize,
  count: count,
 });
};
// 搜索用户
exports.serachuser = async (req, res) => {};
// 删除用户
exports.deleteuser = async (req, res) => {
 const flag = await User.findOneAndDelete({ _id: req.query.id });
 if (!flag) {
  return res.send({
   status: 400,
   message: "删除失败",
  });
 } else {
  res.send({
   status: 200,
   message: "删除成功",
  });
 }
};
// 查询获取用户信息
exports.getuser = async (req, res) => {
 // console.log(req.query);
 const user = await User.findOne({ _id: req.query.id });
 if (!user) {
  return res.send({
   status: 400,
   message: "获取用户信息失败",
  });
 } else {
  res.send({
   status: 200,
   message: "获取用户信息成功",
   user: user,
  });
 }
};
// 更新用户信息
exports.updateuser = async (req, res) => {
 // console.log(req.body);
 const { _id, username, email, role, state } = req.body;
 // const user1 = await User.findOne({_id:_id})
 const user = await User.findOneAndUpdate(
  { _id: req.body._id },
  { $set: { username: username, email: email, role: role, state: state } },
  { new: true }
 );
 console.log(user);
 if (!user) {
  return res.send({
   status: 400,
   message: "更新用户信息失败",
  });
 } else {
  res.send({
   status: 200,
   message: "更新用户信息成功",
   user: user,
  });
 }
};

// 添加文章标签
exports.classify = async (req, res) => {
 const { classify } = req.body;
 const classes = await Classify.findOne({ classify: classify });
 if (classes) {
  return res.send({
   status: 400,
   message: "该分类已经存在",
  });
 } else {
  await Classify.create({ classify: classify });
  res.send({
   status: 200,
   message: "分类添加成功",
  });
 }
};
//查询文章标签
exports.classifylist = async (req, res) => {
 const classifylist = await Classify.find({});
 if (classifylist.length <= 0) {
  return res.send({
   status: 400,
   message: "获取文章分类失败",
  });
 } else {
  res.send({
   status: 200,
   message: "获取文章分类成功",
   classifylist: classifylist,
  });
 }
};
// 删除文章分类
exports.deleteclassify = async (req, res) => {
 const flag = await Classify.findOneAndDelete({ _id: req.query.id });
 if (!flag) {
  return res.send({
   status: 400,
   message: "删除失败",
  });
 } else {
  res.send({
   status: 200,
   message: "删除成功",
  });
 }
};
// 获取需要修改的文章分类
exports.getclassify = async (req, res) => {
 // console.log(req.query);
 const classify = await Classify.findOne({ _id: req.query.id });
 if (!classify) {
  return res.send({
   status: 400,
   message: "获取分类信息失败",
  });
 } else {
  res.send({
   status: 200,
   message: "获取分类信息成功",
   classify: classify,
  });
 }
};
// 修改分类
exports.editclassify = async (req, res) => {
 // console.log(req);
 const classify = await Classify.findOneAndUpdate(
  { _id: req.body._id },
  { $set: { classify: req.body.classify } },
  { new: true }
 );
 if (!classify) {
  return res.send({
   status: 400,
   message: "获取分类信息失败",
  });
 } else {
  res.send({
   status: 200,
   message: "获取分类信息成功",
   classify: classify,
  });
 }
};

// 新增文章
exports.article = async (req, res) => {
 const {
  title,
  cover,
  content,
  tag,
  isPublish,
  description,
  classify,
 } = req.body;
 await Article.create({
  title: title,
  cover: cover,
  content: content,
  description: description,
  classify: classify,
  tag: tag,
  isPublish: isPublish,
 });
 res.send({
  status: 200,
  message: "文章写入成功",
 });
};
// 修改文章
exports.editarticle = async (req, res) => {
 const {
  id,
  title,
  cover,
  content,
  tag,
  isPublish,
  description,
  classify,
 } = req.body;
 // console.log(req.body);
 await Article.findByIdAndUpdate(
  { _id: id },
  {
   title: title,
   cover: cover,
   content: content,
   description: description,
   classify: classify,
   tag: tag,
   isPublish: isPublish,
  },
  { new: true }
 );
 res.send({
  status: 200,
  message: "文章修改成功",
 });
};
//查询文章
exports.articlelist = async (req, res) => {
 // 接收客户端传来的当前页参数
 let page = req.query.currentPage || 1;
 // 每一页显示的数据条数
 // let pages = req.query.pageSize;
 let pageSize = 4;
 // 查询用户数据的总数
 let count = await Article.countDocuments({});
 //总页数
 let total = Math.ceil(count / pageSize);
 // res.send(total);
 // return;
 //页码对应的数据查询开始位置
 let start = (page - 1) * pageSize;
 // 从数据库中查询用户
 let articles = await Article.find({}).limit(pageSize).skip(start);
 res.send({
  articles: articles,
  page: page,
  total: total,
  pageSize: pageSize,
  count: count,
 });
};
//是否发布文章
exports.changepublish = async (req, res) => {
 console.log(req.body);
 const article = await Article.findOneAndUpdate(
  { _id: req.body._id },
  { $set: { isPublish: req.body.isPublish } },
  { new: true }
 );
 if (!article) {
  return res.send({
   status: 400,
   message: "切换失败",
  });
 } else {
  res.send({
   status: 200,
   message: "切换成功",
   article: article,
  });
 }
};
// 是否推荐文章
exports.changehot = async (req, res) => {
 console.log(req.body);
 const article = await Article.findOneAndUpdate(
  { _id: req.body._id },
  { $set: { isHot: req.body.isHot } },
  { new: true }
 );
 if (!article) {
  return res.send({
   status: 400,
   message: "切换失败",
  });
 } else {
  res.send({
   status: 200,
   message: "切换成功",
   article: article,
  });
 }
};
// 删除文章
exports.deletearticle = async (req, res) => {
 const flag = await Article.findOneAndDelete({ _id: req.query.id });
 if (!flag) {
  return res.send({
   status: 400,
   message: "删除失败",
  });
 } else {
  res.send({
   status: 200,
   message: "删除成功",
  });
 }
};
// 获取文章信息
exports.getarticle = async (req, res) => {
 console.log(req.query);
 const article = await Article.findOne({ _id: req.query.id });
 if (!article) {
  return res.send({
   status: 400,
   message: "获取文章信息失败",
  });
 } else {
  res.send({
   status: 200,
   message: "获取文章信息成功",
   article: article,
  });
 }
};

// 发表评论
exports.comment = async (req, res) => {
 const { aid, uid, content } = req.body;
 const comment = await Comment.create({
  aid: aid,
  uid: uid,
  content: content,
 });
 if (!comment) {
  return res.send({
   status: 400,
   message: "发表评论失败",
  });
 } else {
  res.send({
   status: 200,
   message: "发表评论成功",
   comment: comment,
  });
 }
};
//查询评论列表
exports.commentlist = async (req, res) => {
 // 接收客户端传来的当前页参数
 let page = req.query.currentPage || 1;
 // 每一页显示的数据条数
 // let pages = req.query.pageSize;
 let pageSize = 4;
 // 查询用户数据的总数
 let count = await Comment.countDocuments({});
 //总页数
 let total = Math.ceil(count / pageSize);
 // res.send(total);
 // return;
 //页码对应的数据查询开始位置
 let start = (page - 1) * pageSize;
 // 从数据库中查询评论
 let comments = await Comment.find({})
  .populate("uid")
  .populate("aid")
  .limit(pageSize)
  .skip(start);
 console.log(comments);
 res.send({
  comments: comments,
  page: page,
  total: total,
  pageSize: pageSize,
  count: count,
 });
};
// 删除评论
exports.deletecomment = async (req, res) => {
 const flag = await Comment.findOneAndDelete({ _id: req.query.id });
 if (!flag) {
  return res.send({
   status: 400,
   message: "删除失败",
  });
 } else {
  res.send({
   status: 200,
   message: "删除成功",
  });
 }
};

//添加友情链接
exports.friendly = async (req, res) => {
 // console.log(req.body);
 const { title, url } = req.body;
 const friendly = await Friendly.create({ title: title, url: url });
 // res.send(friendly)
 if (!friendly) {
  return res.send({
   status: 400,
   message: "创建链接失败！",
  });
 } else {
  res.send({
   status: 200,
   message: "创建链接成功",
   friendly: friendly,
  });
 }
};
//获取友情链接列表
exports.friendlylist = async (req, res) => {
 const friendly = await Friendly.find({});
 if (!friendly) {
  return res.send({
   status: 400,
   message: "获取链接列表失败！",
  });
 } else {
  res.send({
   status: 200,
   message: "获取链接列表成功！",
   friendly: friendly,
  });
 }
};
//获取需要修改的友情链接
exports.getfriendly = async (req, res) => {
 console.log(req);
 const friendly = await Friendly.findOne({ _id: req.query.id });
 if (!friendly) {
  return res.send({
   status: 400,
   message: "获取友情链接信息失败！",
  });
 } else {
  res.send({
   status: 200,
   message: "获取友情链接信息成功！",
   friendly: friendly,
  });
 }
};
// 修改友情链接
exports.updatefriendly = async (req, res) => {
 const friendly = await Friendly.findOneAndUpdate(
  { _id: req.body._id },
  { $set: { title: req.body.title, url: req.body.url } },
  { new: true }
 );
 if (!friendly) {
  return res.send({
   status: 400,
   message: "更新友情链接信息失败！",
  });
 } else {
  res.send({
   status: 200,
   message: "更新友情链接信息成功！",
   friendly: friendly,
  });
 }
};
// 删除文章分类
exports.deletefriendly = async (req, res) => {
 const flag = await Friendly.findOneAndDelete({ _id: req.query.id });
 if (!flag) {
  return res.send({
   status: 400,
   message: "删除失败",
  });
 } else {
  res.send({
   status: 200,
   message: "删除成功",
  });
 }
};

//添加友情链接
exports.swiper = async (req, res) => {
 // console.log(req.body);
 const { img, url, description } = req.body;
 const swiper = await Swiper.create({
  img: img,
  url: url,
  description: description,
 });
 // res.send(friendly)
 if (!swiper) {
  return res.send({
   status: 400,
   message: "创建链接失败！",
  });
 } else {
  res.send({
   status: 200,
   message: "创建链接成功",
   swiper: swiper,
  });
 }
};
//获取友情链接列表
exports.swiperlist = async (req, res) => {
 const swiper = await Swiper.find({});
 if (!swiper) {
  return res.send({
   status: 400,
   message: "获取链接列表失败！",
  });
 } else {
  res.send({
   status: 200,
   message: "获取链接列表成功！",
   swiper: swiper,
  });
 }
};
//获取需要修改的友情链接
exports.getswiper = async (req, res) => {
 console.log(req);
 const swiper = await Swiper.findOne({ _id: req.query.id });
 if (!swiper) {
  return res.send({
   status: 400,
   message: "获取友情链接信息失败！",
  });
 } else {
  res.send({
   status: 200,
   message: "获取友情链接信息成功！",
   swiper: swiper,
  });
 }
};
// 修改友情链接
exports.updateswiper = async (req, res) => {
 const swiper = await Swiper.findOneAndUpdate(
  { _id: req.body._id },
  {
   $set: {
    img: req.body.img,
    url: req.body.url,
    description: req.body.description,
   },
  },
  { new: true }
 );
 if (!swiper) {
  return res.send({
   status: 400,
   message: "更新友情链接信息失败！",
  });
 } else {
  res.send({
   status: 200,
   message: "更新友情链接信息成功！",
   swiper: swiper,
  });
 }
};
// 删除文章分类
exports.deleteswiper = async (req, res) => {
 const flag = await Swiper.findOneAndDelete({ _id: req.query.id });
 if (!flag) {
  return res.send({
   status: 400,
   message: "删除失败",
  });
 } else {
  res.send({
   status: 200,
   message: "删除成功",
  });
 }
};
