// 导入express模块
const express = require('express');
const router = express.Router();
// 将路由函数导入
// const userHandler=require('../router_handler/admin')
const auth = require('../middleware/auth')

const login = require('../router_handler/admin/login');
const user = require('../router_handler/admin/user');
const article = require('../router_handler/admin/article');
// const classify = require('../router_handler/admin/classify');
const category = require('../router_handler/admin/category');
const comment = require('../router_handler/admin/comment');
const friend = require('../router_handler/admin/friend');
const swiper = require('../router_handler/admin/swiper');
const sentence = require('../router_handler/admin/sentence');
const image = require('../router_handler/admin/image');

// 后台登录注册
router.get('/captcha', login.captcha) // 获取验证码信息
router.post('/reg', login.reg) // 用户注册路由
router.post('/login', login.login) // 用户登录路由

// 用户信息
router.get('/users', auth, user.list) // 获取用户数据列表
router.get('/users/search', user.search) //搜索用户
router.delete('/users/:id', user.delete) //删除用户
router.get('/users/:id', user.info) //查询获取用户信息
router.put('/users/:id', user.edit) //更新用户信息
router.patch('/users/:id/state/:type', user.state) //修改用户状态

// 文章信息
router.post('/articles', article.new) //新增文章 
router.put('/articles/:id',article.edit) //修改文章 
router.get('/articles', article.list) //获取文章列表
// router.patch('/articles/:id/isblish', article.changepublish) //是否发布文章
// router.patch('/articles/:id/ishot', article.changehot) //是否推荐文章
router.patch('/articles/:id', article.state) // 更新文章状态
router.delete('/articles/:id', article.delete) //删除文章
router.get('/articles/:id', article.info) //获取文章信息 

// 分类管理
router.post('/categories', category.new) // 新增分类
router.get('/categories', category.list) // 获取分类列表
router.delete('/categories/:id', category.delete) // 删除分类
router.get('/categories/:id', category.info) // 获取需要修改的分类
router.put('/categories/:id', category.edit) // 修改分类

// 评论管理
// router.post('/comments/:id', comment.reply) // 回复评论 
// router.post('/comments', comment.new) // 新增评论
router.get('/comments/:id', comment.info) // 根据ID获取评论
router.patch('/comments/:id', comment.check) // 审核评论
router.get('/comments', comment.list) // 获取评论列表
router.delete('/comments/:id', comment.delete) // 删除评论

// 友情链接管理
router.post('/friends', friend.new) // 添加友情链接
router.get('/friends', friend.list) // 获取友情链接列表
router.patch('/friends/:id', friend.check) // 审核评论
router.get('/friends/:id', friend.info) // 获取需要修改友情链接
router.put('/friends/:id', friend.edit) // 修改友情链接
router.delete('/friends/:id', friend.delete) // 删除友情链接

// 轮播图管理
router.post('/swipers', swiper.new) // 添加轮播图
router.get('/swipers', swiper.list) // 添加轮播图
router.get('/swipers/:id', swiper.info) // 获取需要修改的轮播图
router.put('/swipers/:id', swiper.edit) // 修改轮播图信息
router.delete('/swipers/:id', swiper.delete) // 删除轮播图信息
router.patch('/swipers/:id', swiper.check) // 审核评论

// 每日一句
router.post('/sentences', sentence.new) //添加每日一句
router.get('/sentences', sentence.list) //获取每日一句列表
router.delete('/sentences/:id', sentence.delete) //删除每日一句
router.get('/sentences/:id', sentence.info) // 获取需要修改的每日一句
router.put('/sentences/:id', sentence.edit) // 修改轮播图
router.patch('/sentences/:id', sentence.check) // 审核评论

// 图片管理
router.post('/images', image.new) //添加图片
router.patch('/images/:id', image.check) // 审核评论
router.get('/images', image.list) //获取图片列表
router.delete('/images/:id', image.delete) //删除图片
router.get('/images/:id', image.info) // 获取需要修改的图片
router.put('/images/:id', image.edit) // 修改图片


// router.post('/userinfo', userHandler.userinfo) //添加每日一句
// router.get('/userinfolist', userHandler.userinfolist) //获取每日一句列表
// router.delete('/deleteuserinfo', userHandler.deleteuserinfo) //删除每日一句
// router.get('/getuserinfo', userHandler.getuserinfo) // 获取需要修改的每日一句
// router.put('/updateuserinfo', userHandler.updateuserinfo) // 修改轮播图

// router.post('/userinfo', userHandler.userinfo) //添加图片
// router.get('/userinfolist', userHandler.userinfolist) //获取图片列表
// router.delete('/deleteuserinfo', userHandler.deleteuserinfo) //删除图片
// router.get('/getuserinfo', userHandler.getuserinfo) // 获取需要修改的图片
// router.put('/updateuserinfo', userHandler.updateuserinfo) // 修改图片


// 将对进行导出
module.exports = router;