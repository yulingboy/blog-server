// 导入express模块
const express = require('express');
const router = express.Router();
// 将路由函数导入
const homeHandler=require('../router_handler/home')

router.get('/articles', homeHandler.articles)
router.get('/article', homeHandler.article)

// 将对进行导出
module.exports = router;