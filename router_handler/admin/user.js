// 导入用户模型
const User = require("../../models/user");

// 用户信息列表
exports.list = async (req, res) => {
  try {
    // 接收客户端传来的当前页参数
    let pageNum = +req.query.pageNum || 1;
    // 每一页显示的数据条数
    let pageSize = +req.query.pageSize || 10;
    // 查询用户数据的总数
    let total = await User.countDocuments({});
    //总页数
    let pageCount = Math.ceil(total / pageSize);
    //页码对应的数据查询开始位置
    let start = (pageNum - 1) * pageSize;
    // 从数据库中查询用户
    let users = await User.find({}).limit(pageSize).skip(start); 
    res.send({
      meta:{
        status: 200,
        message: "success"
      },
      data:{
        users:users, //用户数据
        pageNum: pageNum,  // 当前页
        total: total, // 数据总数
        pageSize: pageSize, // 每页条数
        pageCount: pageCount, // 页数
      }
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: error,
    });
  }
};
// 搜索用户
exports.search = async (req, res) => {
  try {
    const username = new RegExp(req.query.username);
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.send({
        status: 400,
        message: "fail",
      });
    } else {
      res.send({
        status: 200,
        message: "success",
        data: user,
      });
    }
  } catch (error) {
    return res.send({
      status: 500,
      message: error,
    });
  }
};
// 删除用户
exports.delete = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    if (!user) {
      return res.send({
        status: 400,
        message: "fail",
      });
    } else {
      res.send({
        meta:{
          status: 200,
          message: "success"
        },
        data:user
      });
    }
  } catch (error) {
    return res.send({
      status: 500,
      message: error,
    });
  }
};
// 根据id查询用户信息
exports.info = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.send({
        status: 400,
        message: "fail",
      });
    } else {
      res.send({
        meta:{
          status: 200,
          message: "success",
        },
        data: user
      });
    }
  } catch (error) {
    return res.send({
      status: 500,
      message: error,
    });
  }
};
// 更新用户信息
exports.edit = async (req, res) => {
  console.log(req.body)
  try {
    // const { username, email, role, state } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    // console.log(user);
    if (!user) {
      return res.send({
        status: 400,
        message: "fail",
      });
    } else {
      res.send({
        status: 200,
        message: "success",
        data: user,
      });
    }
  } catch (error) {
    return res.send({
      status: 500,
      message: error,
    });
  }
};
// 更新用户信息
exports.state = async (req, res) => {
  // console.log(req.query)
  try {
    // const { username, email, role, state } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: {state: req.params.type} },
      { new: true }
    );
    // console.log(user);
    if (!user) {
      return res.send({
        status: 400,
        message: "fail",
      });
    } else {
      res.send({
        status: 200,
        message: "success",
        data: user,
      });
    }
  } catch (error) {
    return res.send({
      status: 500,
      message: error,
    });
  }
};
