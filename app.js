// 引入express模块
const express = require('express');
// 导入express-session模块
const session = require("express-session");
// 导入cors 解决跨域
const cors = require('cors');
// 导入body-parser 在post请求中，express本身不能解析请求体里的参数，需要用到'body-parser'插件
const bodyPaser = require('body-parser');
// 导入用户将客户端发送过来的JWT字符串，解析还原成JSON对象的包
const expressJWT = require('express-jwt');
// 导入 cookie-parser 
const cookieParser = require('cookie-parser');
// 导入morgan 用于解析操作日志
const morgan = require('morgan');

// 导入config配置
const config = require('./config/config');

const jwtAuth = require('./middleware/jwtAuth');

// 导入后台路由
const admin = require('./routes/admin');
const home = require('./routes/home');

// 导入数据库
const connectionDB = require('./config/db');
connectionDB();

// 创建app
const app = express();
// 解析post参数
app.use(bodyPaser.json());
// 处理post请求参数
app.use(bodyPaser.urlencoded({ extended: false }));

// 打印操作日志
app.use(morgan('short'));

app.use(cookieParser());

app.use(session({
  secret: config.secretKey,
  cookie: {maxAge: 1000*60*60*24},
  resave:false, 
  saveUninitialized: true,
}))

// app.use(cookieSession({
// 	name:"sessionId",
// 	keys,
// 	maxAge:30*60*1000 //ms
// }))

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

// 使用cors解决跨域
app.use(cors());
// 将 JWT 字符串还原为 JSON 对象 
app.use(jwtAuth);
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
app.use('/api/admin/v2', admin);
app.use('/home/api', home);
app.listen(3000,config.ip, () => {
  console.log('服务器启动成功'+ config.ip); 
})
// app.listen(3000,'127.0.0.1', () => {
//   console.log('服务器启动成功'); 
// })