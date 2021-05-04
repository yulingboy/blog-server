// 引入用户集合
const User = require("../../models/user");
// 引入bcrypt模块
const bcrypt = require("bcrypt");
// 导入用于生成JWT字符串的包
const jwt = require("jsonwebtoken");
// 导入svg-captcha 生成图片验证码
const svgCaptcha = require("svg-captcha");
// 引入config配置
const config = require("../../config/config");

// 获取svg验证码
exports.captcha = (req, res) => {
  try {
    const captcha = svgCaptcha.create({
      // 验证码是否五颜六色
      color: true,
      // 验证码干扰线条数
      noise: 2,
      // 验证码不会有的数字或字母
      ignoreChars: "0o1il",
      // 验证码字符长度
      size: 4,
      // 验证码高度
      height: 40,
      // 验证码宽度
      width: 140,
    });
    // 将验证码的字符全部转成小写存储到session中
    req.session.captcha = captcha.text.toLocaleLowerCase();
    // 以svg形式将验证码返回给前台页面
    res.type("svg");
    res.send(captcha.data);
  } catch (error) {
    return res.send({
      status: 500,
      message: error
    })
  }
};

// 用户注册
exports.reg = async (req, res) => {
  try {
    // 根据用户邮箱查询是否存在
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    //如果邮箱已经注册过

    //向客户端发送信息
    return res.send({
      meta:{
        status: 422,
        message: "邮箱地址被占用",
      }
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
    const userInfo = await User.create(req.body);
    //向客户端发送信息
    res.send({
     meta:{
      status: 200,
      message: "注册用户成功"
     },
     data: userInfo
    });
  }
  } catch (error) {
    return res.send({
      meta:{
        status: 500,
        message: error
      }
    })
  }
};

// 用户登录
exports.login = async (req, res) => {
  try {
    // 将用户信息结构出来
  const { username, password, email } = req.body;

  //   if (req.session.captcha !== req.body.captcha) {
  //     return res.send({
  //      status: 400,
  //      message: "验证码错误",
  //     });
  //    }

  // 根据用户邮箱查询是否存在
  const user = await User.findOne({ email: email });
  if(!user){
    return res.send({
      meta: {
        status: 400,
        message: "用户不存在！",
      }
    });
  }
  // 比对密码是否正确
  const isVaild = await bcrypt.compare(req.body.password, user.password);
  if (!isVaild) {
    //密码错误
    return res.send({
      meta: {
        status: 400,
        message: "密码错误",
      }
    });
  } else {
    //密码正确
    // 在登录成功之后，调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
    const tokenStr =
      "Bearer " +
      jwt.sign({ username: req.body.username, role: user.role}, config.secretKey, {
        expiresIn: 600 * 24 * 3,
      });
    res.send({
     meta:{
      status: 200,
      message: "登录成功！"
     },
     data:{
      user:user,
      token: tokenStr, // 要发送给客户端的 token 字符串
     }
    });
  }
  } catch (error) {
    return res.send({
      status: 500,
      message: error
    })
  }
};
