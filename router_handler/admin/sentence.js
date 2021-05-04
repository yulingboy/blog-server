const Beautiful = require("../../models/beautifulline");

//添加每日一句
exports.new = async (req, res) => {
  try {
    const sentence = await Beautiful.create(req.body);
    if (!sentence) {
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
        data: sentence,
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
//获取每日一句列表
exports.list = async (req, res) => {
  try {
    // 接收客户端传来的当前页参数
    let pageNum = +req.query.pageNum || 1;
    // 每一页显示的数据条数
    let pageSize = +req.query.pageSize || 10;
    // 查询用户数据的总数
    let total = await Beautiful.countDocuments({});
    //总页数
    let pageCount = Math.ceil(total / pageSize);
    //页码对应的数据查询开始位置
    let start = (pageNum - 1) * pageSize;
    // 从数据库中查询用户
    let sentence = await Beautiful.find({})
      .sort({ time: -1 })
      .limit(pageSize)
      .skip(start);
    res.send({
      meta: {
        status: 200,
        message: "success",
      },
      data: {
        sentence: sentence, //用户数据
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
// 删除每日一句
exports.delete = async (req, res) => {
  try {
    const sentence = await Beautiful.findOneAndDelete({ _id: req.params.id });
    if (!sentence) {
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
//根据ID获取每日一句
exports.info = async (req, res) => {
  try {
    const sentence = await Beautiful.findOne({ _id: req.params.id });
    if (!sentence) {
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
        data: sentence,
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
// 修改每日一句
exports.edit = async (req, res) => {
  try {
    const sentence = await Beautiful.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { title: req.body.title } },
      { new: true }
    );
    if (!sentence) {
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
        data: sentence,
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
// 审核友情链接
exports.check = async (req, res) => {
  try {
    const centence = await Beautiful.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!centence) {
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
        data: centence,
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
