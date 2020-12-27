const Imgbed = require("../../models/imgbed");

//添加图片
exports.new = async (req, res) => {
  try {
    const { img, title, description } = req.body;
    const image = await Imgbed.create({ title, img, description });
    if (!image) {
      return res.send({
        status: 400,
        message: "fail",
      });
    } else {
      res.send({
        status: 200,
        message: "success",
        data: image,
      });
    }
  } catch (error) {
    return res.send({
      status: 500,
      message: error,
    });
  }
};
//获取图片列表
exports.list = async (req, res) => {
  try {
    // 接收客户端传来的当前页参数
    let pageNum = +req.query.pageNum || 1;
    // 每一页显示的数据条数
    let pageSize = +req.query.pageSize || 10;
    // 查询用户数据的总数
    let total = await Imgbed.countDocuments({});
    //总页数
    let pageCount = Math.ceil(total / pageSize);
    //页码对应的数据查询开始位置
    let start = (pageNum - 1) * pageSize;
    // 从数据库中查询用户
    let images = await Imgbed.find({}).sort({time: -1}).limit(pageSize).skip(start); 
    res.send({
      meta:{
        status: 200,
        message: "success"
      },
      data:{
        images:images, //用户数据
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
// 删除图片
exports.delete = async (req, res) => {
  try {
    const image = await Imgbed.findOneAndDelete({ _id: req.params.id });
    if (!image) {
      return res.send({
        status: 400,
        message: "fail",
      });
    } else {
      res.send({
        status: 200,
        message: "success"
      });
    }
  } catch (error) {
    return res.send({
      status: 500,
      message: error,
    });
  }
};
//根据ID获取图片
exports.info = async (req, res) => {
  try {
    const image = await Imgbed.findOne({ _id: req.params.id });
    if (!image) {
      return res.send({
        status: 400,
        message: "fail",
      });
    } else {
      res.send({
        status: 200,
        message: "success",
        data: image,
      });
    }
  } catch (error) {
    return res.send({
      status: 500,
      message: error,
    });
  }
};
// 修改图片
exports.edit = async (req, res) => {
  try {
    const image = await Imgbed.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!image) {
      return res.send({
        status: 400,
        message: "fail",
      });
    } else {
      res.send({
        status: 200,
        message: "success",
        data: image,
      });
    }
  } catch (error) {
    return res.send({
      status: 500,
      message: error,
    });
  }
};
// 审核图片
exports.check = async (req, res) => {
  try {
    const friend = await Imgbed.findOneAndUpdate({ _id: req.params.id },{ $set: req.body },{ new: true });
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