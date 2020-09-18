// 导入express模块
const express = require('express');
const router = express.Router();
// 将路由函数导入
const userHandler=require('../router_handler/admin')

router.get('/captcha', userHandler.captcha) // 获取验证码信息

router.post('/reg', userHandler.reg) // 用户注册路由
router.post('/login', userHandler.login) // 用户登录路由
router.get('/userlist', userHandler.userlist) // 获取用户数据
router.get('/serachuser', userHandler.serachuser) //查询用户
router.delete('/deleteuser', userHandler.deleteuser) //删除用户
router.get('/getuser', userHandler.getuser) //查询获取用户信息
router.put('/updateuser', userHandler.updateuser) //更新用户信息

router.post('/article', userHandler.article) //新增文章 
router.put('/editarticle',userHandler.editarticle) //修改文章 
router.get('/articlelist', userHandler.articlelist) //获取文章列表
router.put('/changepublish', userHandler.changepublish) //是否发布文章
router.put('/changehot', userHandler.changehot) //是否推荐文章
router.delete('/deletearticle', userHandler.deletearticle) //删除文章
router.get('/getarticle', userHandler.getarticle) //获取文章信息 

router.post('/classify', userHandler.classify) // 分类管理
router.get('/classifylist', userHandler.classifylist) // 获取分类
router.delete('/deleteclassify', userHandler.deleteclassify) // 删除分类
router.get('/getclassify', userHandler.getclassify) // 获取需要修改的分类
router.put('/editclassify', userHandler.editclassify) // 修改分类

router.post('/comment', userHandler.comment) // 发表评论
router.get('/commentlist', userHandler.commentlist) // 发表评论
router.delete('/deletecomment', userHandler.deletecomment) // 删除评论

router.post('/friendly', userHandler.friendly) // 添加友情链接
router.get('/friendlylist', userHandler.friendlylist) // 添加友情链接
router.get('/getfriendly', userHandler.getfriendly) // 获取需要修改的友情链接
router.put('/updatefriendly', userHandler.updatefriendly) // 修改友情链接
router.delete('/deletefriendly', userHandler.deletefriendly) // 删除链接信息

router.post('/swiper', userHandler.swiper) // 添加轮播图
router.get('/swiperlist', userHandler.swiperlist) // 添加轮播图
router.get('/getswiper', userHandler.getswiper) // 获取需要修改的轮播图
router.put('/updateswiper', userHandler.updateswiper) // 修改轮播图
router.delete('/deleteswiper', userHandler.deleteswiper) // 删除轮播图信息


// 将对进行导出
module.exports = router;