const Article = require("../../models/article");

// 新增文章
exports.new = async (req, res) => {
  try {
    const {
      title,
      cover,
      content,
      tag,
      isPublish,
      description,
      classify,
    } = req.body;
    const article = await Article.create({
      title,
      cover,
      content,
      description,
      classify,
      tag,
      isPublish,
    });
    if (article) {
      return res.send({
        meta: {
          status: 200,
          message: "success",
        },
        data: article,
      });
    } else {
      res.send({
        meta: {
          status: 400,
          message: "fail",
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
// 修改文章
exports.edit = async (req, res) => {
  try {
    // const { title, cover, content, tag, isPublish, description, classify } = req.body;
    const article = await Article.findByIdAndUpdate(
      { _id: req.params.id },
      // { title, cover, content, description, classify, tag, isPublish },
      req.body,
      { new: true }
    );
    if (article) {
      return res.send({
        meta: {
          status: 200,
          message: "success",
        },
        data: article,
      });
    } else {
      res.send({
        meta: {
          status: 400,
          message: "fail",
        },
      });
    }
  } catch (error) {
    res.send({
      meta: {
        status: 500,
        message: error,
      },
    });
  }
};
//查询文章列表
exports.list = async (req, res) => {
  try {
    console.log(req.query);
    // 接收客户端传来的当前页参数
    let pageNum = +req.query.pageNum || 1;
    // 每一页显示的数据条数
    let pageSize = +req.query.pageSize || 10;
    // 查询用户数据的总数
    let total = await Article.countDocuments({});
    //总页数
    let pageCount = Math.ceil(total / pageSize);
    //页码对应的数据查询开始位置
    let start = (pageNum - 1) * pageSize;
    // 从数据库中查询用户
    let articles = await Article.find({}).limit(pageSize).skip(start);
    res.send({
      meta: {
        status: 200,
        message: "success",
      },
      data: {
        articles: articles, //用户数据
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
      status: 500,
      message: error,
    });
  }
};
//是否发布文章
// exports.changepublish = async (req, res) => {
//   try {
//     const article = await Article.findOneAndUpdate(
//       { _id: req.body._id },
//       { $set: { isPublish: req.body.isPublish } },
//       { new: true }
//     );
//     if (!article) {
//       return res.send({
//         status: 400,
//         message: "fail",
//       });
//     } else {
//       res.send({
//         status: 200,
//         message: "success",
//         data: article,
//       });
//     }
//   } catch (error) {
//     res.send({
//       status: 500,
//       message: error
//     })
//   }
// };
// 是否推荐文章
// exports.changehot = async (req, res) => {
//   try {
//     const article = await Article.findOneAndUpdate(
//       { _id: req.body._id },
//       { $set: { isHot: req.body.isHot } },
//       { new: true }
//     );
//     if (!article) {
//       return res.send({
//         status: 400,
//         message: "fail",
//       });
//     } else {
//       res.send({
//         status: 200,
//         message: "success",
//         data: article,
//       });
//     }
//   } catch (error) {
//     res.send({
//       status: 500,
//       message: error
//     })
//   }
// };
// 更新文章状态
exports.state = async (req, res) => {
  console.log(req.body);
  console.log(req.query);
  try {
    const article = await Article.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!article) {
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
        data: article,
      });
    }
  } catch (error) {
    res.send({
      meta: {
        status: 500,
        message: error,
      },
    });
  }
};
// 删除文章
exports.delete = async (req, res) => {
  const article = await Article.findOneAndDelete({ _id: req.params.id });
  try {
    if (!article) {
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
    res.send({
      meta: {
        status: 500,
        message: error,
      },
    });
  }
};
// 获取文章信息
exports.info = async (req, res) => {
  console.log(req.params)
  const article = await Article.findOne({ _id: req.params.id });
  try {
    if (!article) {
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
        data: article,
      });
    }
  } catch (error) {
    res.send({
      meta: {
        status: 500,
        message: error,
      },
    });
  }
};
