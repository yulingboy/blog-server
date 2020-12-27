const Comment = require("../../models/comment");


// 根据ID查询评论
exports.info = async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.id });
    if (!comment) {
      return res.send({
        status: 400,
        message: "fail",
      });
    } else {
      res.send({
        status: 200,
        message: "fail",
        data: comment,
      });
    }
  } catch (error) {
    return res.send({
      status: 500,
      message: error,
    });
  }
};
// 回复评论
exports.reply = async (req, res) => {
 try {
    const { aid, uid, content } = req.body;
    const comment = await Comment.create({ aid, uid, content });
    if (!comment) {
      return res.send({
        status: 400,
        message: "fail",
      });
    } else {
      res.send({
        status: 200,
        message: "success",
        comment: comment,
      });
    }
 } catch (error) {
     return res.send({
         status: 500,
         message: error
     })
 }
};
//查询评论列表
exports.list = async (req, res) => {
  try {
    // 接收客户端传来的当前页参数
    let pageNum = +req.query.pageNum || 1;
    // 每一页显示的数据条数
    let pageSize = +req.query.pageSize || 10;
    // 查询用户数据的总数
    let total = await Comment.countDocuments({});
    //总页数
    let pageCount = Math.ceil(total / pageSize);
    //页码对应的数据查询开始位置
    let start = (pageNum - 1) * pageSize;
    // 从数据库中查询用户
    let comments = await Comment.find({}).populate("uid").populate("aid").limit(pageSize).skip(start); 
    res.send({
      meta:{
        status: 200,
        message: "success"
      },
      data:{
        comments:comments, //评论数据
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

  // // 接收客户端传来的当前页参数
  // let page = req.query.currentPage || 1;
  // // 每一页显示的数据条数
  // // let pages = req.query.pageSize;
  // let pageSize = 4;
  // // 查询用户数据的总数
  // let count = await Comment.countDocuments({});
  // //总页数
  // let total = Math.ceil(count / pageSize);
  // // res.send(total);
  // // return;
  // //页码对应的数据查询开始位置
  // let start = (page - 1) * pageSize;
  // // 从数据库中查询评论
  // let comments = await Comment.find({})
  //   .populate("uid")
  //   .populate("aid")
  //   .limit(pageSize)
  //   .skip(start);
  // console.log(comments);
  // res.send({
  //   comments: comments,
  //   page: page,
  //   total: total,
  //   pageSize: pageSize,
  //   count: count,
  // });
};
// 删除评论
exports.delete = async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({ _id: req.params.id });
    if (!comment) {
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
          message: error
      })
  }
};
// 审核评论
exports.check = async (req, res) => {
  try {
    const comment = await Comment.findOneAndUpdate({ _id: req.params.id },{ $set: req.body },{ new: true });
    if (!comment) {
      return res.send({
        status: 400,
        message: "fail",
      });
    } else {
      res.send({
        status: 200,
        message: "success",
        data: comment
      });
    }
  } catch (error) {
      return res.send({
          status: 500,
          message: error
      })
  }
};
