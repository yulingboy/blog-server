const Swiper = require("../../models/swiper");

//添加轮播图
exports.new = async (req, res) => {
  try {
    const swiper = await Swiper.create(req.body);
    if (!swiper) {
      return res.send({
        meta: {
          status: 400,
          message: "fail",
        },
      });
    } else {
      res.send({
        meta: {
          status: 200,
          message: "success",
        },
        data: swiper,
      });
    }
  } catch (error) {
    return res.send({
      meta: {
        status: 500,
        message: error,
      },
    });
  }
};
//获取轮播图列表
exports.list = async (req, res) => {
  try {
    // 接收客户端传来的当前页参数
    let pageNum = +req.query.pageNum || 1;
    // 每一页显示的数据条数
    let pageSize = +req.query.pageSize || 10;
    // 查询用户数据的总数
    let total = await Swiper.countDocuments({});
    //总页数
    let pageCount = Math.ceil(total / pageSize);
    //页码对应的数据查询开始位置
    let start = (pageNum - 1) * pageSize;
    // 从数据库中查询用户
    let swipers = await Swiper.find({})
      .sort({ time: -1 })
      .limit(pageSize)
      .skip(start);
    res.send({
      meta: {
        status: 200,
        message: "success",
      },
      data: {
        swipers: swipers, //用户数据
        pagition: {
          pageNum: pageNum, // 当前页
          total: total, // 数据总数
          pageSize: pageSize, // 每页条数
          pageCount: pageCount, // 页数
        },
      },
    });
  } catch (error) {
    return res.send({
      meta: {
        status: 500,
        message: error,
      },
    });
  }
};
//根据ID获取轮播图信息
exports.info = async (req, res) => {
  try {
    const swiper = await Swiper.findOne({ _id: req.params.id });
    if (!swiper) {
      return res.send({
        meta: {
          status: 400,
          message: "fail",
        },
      });
    } else {
      res.send({
        meta: {
          status: 200,
          message: "success",
        },
        data: swiper,
      });
    }
  } catch (error) {
    return res.send({
      meta: {
        status: 500,
        message: error,
      },
    });
  }
};
// 修改轮播图信息
exports.edit = async (req, res) => {
  try {
    const swiper = await Swiper.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!swiper) {
      return res.send({
        meta: {
          status: 400,
          message: "fail",
        },
      });
    } else {
      res.send({
        meta: {
          status: 200,
          message: "success",
        },
        data: swiper,
      });
    }
  } catch (error) {
    return res.send({
      meta: {
        status: 500,
        message: error,
      },
    });
  }
};
// 删除轮播图
exports.delete = async (req, res) => {
  try {
    const swiper = await Swiper.findOneAndDelete({ _id: req.params.id });
    if (!swiper) {
      return res.send({
        meta: {
          status: 400,
          message: "fail",
        },
      });
    } else {
      res.send({
        meta: {
          status: 200,
          message: "success",
        },
      });
    }
  } catch (error) {
    return res.send({
      meta: {
        status: 500,
        message: error,
      },
    });
  }
};
// 审核轮播图状态
exports.check = async (req, res) => {
  try {
    const swiper = await Swiper.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!swiper) {
      return res.send({
        meta: {
          status: 400,
          message: "fail",
        },
      });
    } else {
      res.send({
        meta: {
          status: 200,
          message: "success",
        },
        data: swiper,
      });
    }
  } catch (error) {
    return res.send({
      meta: {
        status: 500,
        message: error,
      },
    });
  }
};
