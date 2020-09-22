// 导入express模块
const express = require('express');
const router = express.Router();
// 将路由函数导入
const homeHandler=require('../router_handler/home')

router.get('/articles', homeHandler.articles) //获取文章列表
router.get('/article', homeHandler.article) //获取文章
router.get('/classifylist', homeHandler.classifylist) // 获取分类文章

router.get('/classifyarticle', homeHandler.classifyarticle) // 获取分类

router.post('/comment', homeHandler.comment) // 获取分类
router.get('/commentlist', homeHandler.commentlist) // 获取分类文章
router.get('/gethotarticle', homeHandler.gethotarticle) // 获取热门文章

router.post('/message', homeHandler.message) // 获取分类
router.get('/messagelist', homeHandler.messagelist) // 获取分类文章

router.post('/friendly', homeHandler.friendly) // 获取分类
router.get('/friendlylist', homeHandler.friendlylist) // 获取分类文章

router.get('/swiperlist', homeHandler.swiperlist) // 获取轮播图

router.get('/beautiful',homeHandler.beautiful) //获取每日一句

router.get('/imglist', homeHandler.imglist) // 获取图片列表
router.get('/img', homeHandler.img) // 获取随机图片 

// 将对进行导出
module.exports = router;