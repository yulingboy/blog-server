const Classify = require("../../models/classify");
// 添加分类标签
exports.new = async (req, res) => {
  try {
    const { classify } = req.body;
    const category = await Classify.findOne({ classify });
    if (category) {
      return res.send({
        status: 400,
        message: "该分类已经存在",
      });
    } else {
      await Classify.create({ classify: classify });
      res.send({
        status: 200,
        message: "分类添加成功",
        data: category,
      });
    }
  } catch (error) {
    return res.send({
      status: 500,
      message: error,
    });
  }
};
//获取分类标签列表
exports.list = async (req, res) => {
  try {
    if (req.query.length <= 0) {
      let categories = await Classify.find({});
      if (categories) {
        return res.send({
          meta: {
            status: 200,
            message: "success",
          },
          data: categories,
        });
      } else {
        return res.send({
          meta: {
            status: 400,
            message: "fail",
          },
        });
      }
    } else {
      // 接收客户端传来的当前页参数
      let pageNum = +req.query.pageNum || 1;
      // 每一页显示的数据条数
      let pageSize = +req.query.pageSize || 10;
      // 查询用户数据的总数
      let total = await Classify.countDocuments({});
      //总页数
      let pageCount = Math.ceil(total / pageSize);
      //页码对应的数据查询开始位置
      let start = (pageNum - 1) * pageSize;
      // 从数据库中查询用户
      let categories = await Classify.find({}).limit(pageSize).skip(start);
      res.send({
        meta: {
          status: 200,
          message: "success",
        },
        data: {
          categories: categories, //用户数据
          pagition: {
            pageNum: pageNum, // 当前页
            total: total, // 数据总数
            pageSize: pageSize, // 每页条数
            pageCount: pageCount, // 页数
          },
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
// 删除分类分类
exports.delete = async (req, res) => {
  try {
    const category = await Classify.findOneAndDelete({ _id: req.params.id });
    if (!category) {
      return res.send({
        status: 400,
        message: "fail",
      });
    } else {
      res.send({
        status: 200,
        message: "success",
      });
    }
  } catch (error) {
    return res.send({
      status: 500,
      message: error,
    });
  }
};
// 根据ID查询分类分类
exports.info = async (req, res) => {
  try {
    const category = await Classify.findOne({ _id: req.params.id });
    if (!category) {
      return res.send({
        status: 400,
        message: "fail",
      });
    } else {
      res.send({
        status: 200,
        message: "fail",
        data: category,
      });
    }
  } catch (error) {
    return res.send({
      status: 500,
      message: error,
    });
  }
};
// 修改分类
exports.edit = async (req, res) => {
  try {
    const category = await Classify.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!category) {
      return res.send({
        status: 400,
        message: "fail",
      });
    } else {
      res.send({
        status: 200,
        message: "success",
        data: category,
      });
    }
  } catch (error) {
    return res.send({
      status: 500,
      message: error,
    });
  }
};
