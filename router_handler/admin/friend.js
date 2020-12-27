const Friendly = require("../../models/friendly");

//添加友情链接
exports.new = async (req, res) => {
  try {
    const { title, url, description } = req.body;
    const friendly = await Friendly.create({ title, url, description });
    if (!friendly) {
      return res.send({
        status: 400,
        message: "fail",
      });
    } else {
      res.send({
        status: 200,
        message: "success",
        data: friendly,
      });
    }
  } catch (error) {
    return res.send({
      status: 500,
      message: error,
    });
  }
};
//获取友情链接列表
exports.list = async (req, res) => {
  try {
    // 接收客户端传来的当前页参数
    let pageNum = +req.query.pageNum || 1;
    // 每一页显示的数据条数
    let pageSize = +req.query.pageSize || 10;
    // 查询用户数据的总数
    let total = await Friendly.countDocuments({});
    //总页数
    let pageCount = Math.ceil(total / pageSize);
    //页码对应的数据查询开始位置
    let start = (pageNum - 1) * pageSize;
    // 从数据库中查询用户
    let friends = await Friendly.find({}).limit(pageSize).skip(start); 
    res.send({
      meta:{
        status: 200,
        message: "success"
      },
      data:{
        friends:friends, //用户数据
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
//根据ID获取友情链接
exports.info = async (req, res) => {
  try {
    const friendly = await Friendly.findOne({ _id: req.params.id });
    if (!friendly) {
      return res.send({
        status: 400,
        message: "fail",
      });
    } else {
      res.send({
        status: 200,
        message: "success",
        data: friendly,
      });
    }
  } catch (error) {
    return res.send({
      status: 500,
      message: error,
    });
  }
};
// 修改友情链接
exports.edit = async (req, res) => {
  try {
    const { title, url } = req.body;
    const friendly = await Friendly.findOneAndUpdate(
      { _id: req.body._id },
      { $set: { title, url } },
      { new: true }
    );
    if (!friendly) {
      return res.send({
        status: 400,
        message: "fail",
      });
    } else {
      res.send({
        status: 200,
        message: "success",
        data: friendly,
      });
    }
  } catch (error) {
    return res.send({
      status: 500,
      message: error,
    });
  }
};
// 删除友情链接
exports.delete = async (req, res) => {
  try {
    const friendly = await Friendly.findOneAndDelete({ _id: req.params.id });
    if (!friendly) {
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
  } catch (error) {
    return res.send({
      status: 500,
      message: error,
    });
  }
};
// 审核友情链接
exports.check = async (req, res) => {
  try {
    const friend = await Friendly.findOneAndUpdate({ _id: req.params.id },{ $set: req.body },{ new: true });
    if (!friend) {
      return res.send({
        status: 400,
        message: "fail",
      });
    } else {
      res.send({
        status: 200,
        message: "success",
        data: friend
      });
    }
  } catch (error) {
      return res.send({
          status: 500,
          message: error
      })
  }
};
