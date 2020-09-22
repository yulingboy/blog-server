// 引入express模块
const express = require('express');
const session = require("express-session");
// 导入cors
const cors = require('cors');
// 导入body-parser
const bodyPaser = require('body-parser');
// 导入用户将客户端发送过来的JWT字符串，解析还原成JSON对象的包
const expressJWT = require('express-jwt');
// const jwt = require('jsonwebtoken');
// const session = require('express-session');

// const cookieSession = require("cookie-session");


// 导入后台路由
const admin = require('./routes/admin');
const home = require('./routes/home');
// 导入数据库
const connectionDB = require('./config/db');
connectionDB();
// 定义 secret 密钥，建议将密钥命名为 secretKey
const secretKey = 'hello yuling'
const app = express();
app.use(bodyPaser.json());
// 处理post请求参数
app.use(bodyPaser.urlencoded({ extended: false }));

// const keys = [];
// for(var i = 0; i < 10000; i++){
// 	keys.push("sessionid"+Math.random());
// }
 
// app.use(cookieSession({
// 	name:"sessionId",
// 	keys,
// 	maxAge:30*60*1000 //ms
// }))

app.use(session({
  secret: '12345',
  cookie: {maxAge: 1000*60*60*24},
  resave:false, 
  saveUninitialized: true,
}))

//设置跨域请求
// app.all('*', function (req, res, next) {
//   let originHeader=req.headers.origin;
//   // res.header("Access-Control-Allow-Origin", origin);
//   res.header("Access-Control-Allow-Origin", originHeader);
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By", ' 3.2.1')
//   res.header("Content-Type", "application/json;charset=utf-8");
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });

app.use(cors());
// 将 JWT 字符串还原为 JSON 对象 
app.use(expressJWT({ secret: secretKey, algorithms: ['HS256'] }).unless({
  path: [
    '/admin/api/login',
    '/admin/api/reg',
    '/admin/api/captcha',
    '/home/api/articles',
    '/home/api/article',
    '/home/api/classifylist',
    '/home/api/classifyarticle',
    '/home/api/comment',
    '/home/api/commentlist',
    '/home/api/gethotarticle',
    '/home/api/message',
    '/home/api/messagelist',
    '/home/api/friendlylist',
    '/home/api/friendly',
    '/home/api/swiperlist',
    '/home/api/beautiful',
    '/home/api/imglist',
    '/home/api/img',
    // '/admin/api/classifylist',
    // '/admin/api/article',
    // '/admin/api/articlelist',
    // '/admin/api/deleteuser',
    // '/admin/api/getuser',
    // '/admin/api/updateuser',
    // '/admin/api/changepublish',
    // '/admin/api/changehot',
    // '/admin/api/deletearticle',
    // '/admin/api/getarticle',
    // '/admin/api/editarticle',
    // '/admin/api/deleteclassify',
    // '/admin/api/getclassify',
    // '/admin/api/editclassify',
    // '/admin/api/comment',
    // '/admin/api/commentlist',
    // '/admin/api/deletecomment',
    // '/admin/api/friendly',
    // '/admin/api/friendlylist',
    // '/admin/api/updatefriendly',
    // '/admin/api/getfriendly',
    // '/admin/api/deletefriendly'
  ]
}));
// 使用全局错误处理中间件，捕获解析 JWT 失败后产生的错误
app.use((err, req, res, next) => {
  // 这次错误是由 token 解析失败导致的
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 401,
      message: '无效的token',
    })
  }
  res.send({
    status: 500,
    message: '未知的错误',
  })
})
app.use('/admin/api', admin);
app.use('/home/api', home);
app.listen(3000,'0.0.0.0', () => {
  console.log('服务器启动成功'); 
})
// app.listen(3000,'127.0.0.1', () => {
//   console.log('服务器启动成功'); 
// })