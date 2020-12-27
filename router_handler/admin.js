// // 引入用户集合
// const User = require("../models/user");
// // 导入文章分类集合
// const Classify = require("../models/classify");
// //导入文章集合
// const Article = require("../models/article");
// //导入评论集合
// const Comment = require("../models/comment");
// //导入友情链接集合
// const Friendly = require("../models/friendly");
// const Swiper = require("../models/swiper");
// const Beautiful = require("../models/beautifulline");
// // 引入bcrypt模块
// const bcrypt = require("bcrypt");
// // 导入用于生成JWT字符串的包
// const jwt = require("jsonwebtoken");
// const svgCaptcha = require("svg-captcha");
// const Imgbed = require("../models/imgbed");
// const Userinfo = require("../models/userinfo");

 


// // 添加文章标签
// exports.classify = async (req, res) => {
//  const { classify } = req.body;
//  const classes = await Classify.findOne({ classify: classify });
//  if (classes) {
//   return res.send({
//    status: 400,
//    message: "该分类已经存在",
//   });
//  } else {
//   await Classify.create({ classify: classify });
//   res.send({
//    status: 200,
//    message: "分类添加成功",
//   });
//  }
// };
// //查询文章标签
// exports.classifylist = async (req, res) => {
//  const classifylist = await Classify.find({});
//  if (classifylist.length <= 0) {
//   return res.send({
//    status: 400,
//    message: "获取文章分类失败",
//   });
//  } else {
//   res.send({
//    status: 200,
//    message: "获取文章分类成功",
//    classifylist: classifylist,
//   });
//  }
// };
// // 删除文章分类
// exports.deleteclassify = async (req, res) => {
//  const flag = await Classify.findOneAndDelete({ _id: req.query.id });
//  if (!flag) {
//   return res.send({
//    status: 400,
//    message: "删除失败",
//   });
//  } else {
//   res.send({
//    status: 200,
//    message: "删除成功",
//   });
//  }
// };
// // 获取需要修改的文章分类
// exports.getclassify = async (req, res) => {
//  // console.log(req.query);
//  const classify = await Classify.findOne({ _id: req.query.id });
//  if (!classify) {
//   return res.send({
//    status: 400,
//    message: "获取分类信息失败",
//   });
//  } else {
//   res.send({
//    status: 200,
//    message: "获取分类信息成功",
//    classify: classify,
//   });
//  }
// };
// // 修改分类
// exports.editclassify = async (req, res) => {
//  // console.log(req);
//  const classify = await Classify.findOneAndUpdate(
//   { _id: req.body._id },
//   { $set: { classify: req.body.classify } },
//   { new: true }
//  );
//  if (!classify) {
//   return res.send({
//    status: 400,
//    message: "获取分类信息失败",
//   });
//  } else {
//   res.send({
//    status: 200,
//    message: "获取分类信息成功",
//    classify: classify,
//   });
//  }
// };

// // // 新增文章
// // exports.article = async (req, res) => {
// //  const {
// //   title,
// //   cover,
// //   content,
// //   tag,
// //   isPublish,
// //   description,
// //   classify,
// //  } = req.body;
// //  await Article.create({
// //   title: title,
// //   cover: cover,
// //   content: content,
// //   description: description,
// //   classify: classify,
// //   tag: tag,
// //   isPublish: isPublish,
// //  });
// //  res.send({
// //   status: 200,
// //   message: "文章写入成功",
// //  });
// // };
// // // 修改文章
// // exports.editarticle = async (req, res) => {
// //  const {
// //   id,
// //   title,
// //   cover,
// //   content,
// //   tag,
// //   isPublish,
// //   description,
// //   classify,
// //  } = req.body;
// //  // console.log(req.body);
// //  await Article.findByIdAndUpdate(
// //   { _id: id },
// //   {
// //    title: title,
// //    cover: cover,
// //    content: content,
// //    description: description,
// //    classify: classify,
// //    tag: tag,
// //    isPublish: isPublish,
// //   },
// //   { new: true }
// //  );
// //  res.send({
// //   status: 200,
// //   message: "文章修改成功",
// //  });
// // };
// // //查询文章
// // exports.articlelist = async (req, res) => {
// //  // 接收客户端传来的当前页参数
// //  let page = req.query.currentPage || 1;
// //  // 每一页显示的数据条数
// //  // let pages = req.query.pageSize;
// //  let pageSize = 4;
// //  // 查询用户数据的总数
// //  let count = await Article.countDocuments({});
// //  //总页数
// //  let total = Math.ceil(count / pageSize);
// //  // res.send(total);
// //  // return;
// //  //页码对应的数据查询开始位置
// //  let start = (page - 1) * pageSize;
// //  // 从数据库中查询用户
// //  let articles = await Article.find({}).limit(pageSize).skip(start);
// //  res.send({
// //   articles: articles,
// //   page: page,
// //   total: total,
// //   pageSize: pageSize,
// //   count: count,
// //  });
// // };
// // //是否发布文章
// // exports.changepublish = async (req, res) => {
// //  console.log(req.body);
// //  const article = await Article.findOneAndUpdate(
// //   { _id: req.body._id },
// //   { $set: { isPublish: req.body.isPublish } },
// //   { new: true }
// //  );
// //  if (!article) {
// //   return res.send({
// //    status: 400,
// //    message: "切换失败",
// //   });
// //  } else {
// //   res.send({
// //    status: 200,
// //    message: "切换成功",
// //    article: article,
// //   });
// //  }
// // };
// // // 是否推荐文章
// // exports.changehot = async (req, res) => {
// //  console.log(req.body);
// //  const article = await Article.findOneAndUpdate(
// //   { _id: req.body._id },
// //   { $set: { isHot: req.body.isHot } },
// //   { new: true }
// //  );
// //  if (!article) {
// //   return res.send({
// //    status: 400,
// //    message: "切换失败",
// //   });
// //  } else {
// //   res.send({
// //    status: 200,
// //    message: "切换成功",
// //    article: article,
// //   });
// //  }
// // };
// // // 删除文章
// // exports.deletearticle = async (req, res) => {
// //  const flag = await Article.findOneAndDelete({ _id: req.query.id });
// //  if (!flag) {
// //   return res.send({
// //    status: 400,
// //    message: "删除失败",
// //   });
// //  } else {
// //   res.send({
// //    status: 200,
// //    message: "删除成功",
// //   });
// //  }
// // };
// // // 获取文章信息
// // exports.getarticle = async (req, res) => {
// //  console.log(req.query);
// //  const article = await Article.findOne({ _id: req.query.id });
// //  if (!article) {
// //   return res.send({
// //    status: 400,
// //    message: "获取文章信息失败",
// //   });
// //  } else {
// //   res.send({
// //    status: 200,
// //    message: "获取文章信息成功",
// //    article: article,
// //   });
// //  }
// // };

// // 发表评论
// exports.comment = async (req, res) => {
//  const { aid, uid, content } = req.body;
//  const comment = await Comment.create({
//   aid: aid,
//   uid: uid,
//   content: content,
//  });
//  if (!comment) {
//   return res.send({
//    status: 400,
//    message: "发表评论失败",
//   });
//  } else {
//   res.send({
//    status: 200,
//    message: "发表评论成功",
//    comment: comment,
//   });
//  }
// };
// //查询评论列表
// exports.commentlist = async (req, res) => {
//  // 接收客户端传来的当前页参数
//  let page = req.query.currentPage || 1;
//  // 每一页显示的数据条数
//  // let pages = req.query.pageSize;
//  let pageSize = 4;
//  // 查询用户数据的总数
//  let count = await Comment.countDocuments({});
//  //总页数
//  let total = Math.ceil(count / pageSize);
//  // res.send(total);
//  // return;
//  //页码对应的数据查询开始位置
//  let start = (page - 1) * pageSize;
//  // 从数据库中查询评论
//  let comments = await Comment.find({})
//   .populate("uid")
//   .populate("aid")
//   .limit(pageSize)
//   .skip(start);
//  console.log(comments);
//  res.send({
//   comments: comments,
//   page: page,
//   total: total,
//   pageSize: pageSize,
//   count: count,
//  });
// };
// // 删除评论
// exports.deletecomment = async (req, res) => {
//  const flag = await Comment.findOneAndDelete({ _id: req.query.id });
//  if (!flag) {
//   return res.send({
//    status: 400,
//    message: "删除失败",
//   });
//  } else {
//   res.send({
//    status: 200,
//    message: "删除成功",
//   });
//  }
// };

// //添加友情链接
// exports.friendly = async (req, res) => {
//  // console.log(req.body);
//  const { title, url } = req.body;
//  const friendly = await Friendly.create({ title: title, url: url });
//  // res.send(friendly)
//  if (!friendly) {
//   return res.send({
//    status: 400,
//    message: "创建链接失败！",
//   });
//  } else {
//   res.send({
//    status: 200,
//    message: "创建链接成功",
//    friendly: friendly,
//   });
//  }
// };
// //获取友情链接列表
// exports.friendlylist = async (req, res) => {
//  const friendly = await Friendly.find({});
//  if (!friendly) {
//   return res.send({
//    status: 400,
//    message: "获取链接列表失败！",
//   });
//  } else {
//   res.send({
//    status: 200,
//    message: "获取链接列表成功！",
//    friendly: friendly,
//   });
//  }
// };
// //获取需要修改的友情链接
// exports.getfriendly = async (req, res) => {
//  console.log(req);
//  const friendly = await Friendly.findOne({ _id: req.query.id });
//  if (!friendly) {
//   return res.send({
//    status: 400,
//    message: "获取友情链接信息失败！",
//   });
//  } else {
//   res.send({
//    status: 200,
//    message: "获取友情链接信息成功！",
//    friendly: friendly,
//   });
//  }
// };
// // 修改友情链接
// exports.updatefriendly = async (req, res) => {
//  const friendly = await Friendly.findOneAndUpdate(
//   { _id: req.body._id },
//   { $set: { title: req.body.title, url: req.body.url } },
//   { new: true }
//  );
//  if (!friendly) {
//   return res.send({
//    status: 400,
//    message: "更新友情链接信息失败！",
//   });
//  } else {
//   res.send({
//    status: 200,
//    message: "更新友情链接信息成功！",
//    friendly: friendly,
//   });
//  }
// };
// // 删除文章分类
// exports.deletefriendly = async (req, res) => {
//  const flag = await Friendly.findOneAndDelete({ _id: req.query.id });
//  if (!flag) {
//   return res.send({
//    status: 400,
//    message: "删除失败",
//   });
//  } else {
//   res.send({
//    status: 200,
//    message: "删除成功",
//   });
//  }
// };

// //添加友情链接
// exports.swiper = async (req, res) => {
//  // console.log(req.body);
//  const { img, url, description } = req.body;
//  const swiper = await Swiper.create({
//   img: img,
//   url: url,
//   description: description,
//  });
//  // res.send(friendly)
//  if (!swiper) {
//   return res.send({
//    status: 400,
//    message: "创建链接失败！",
//   });
//  } else {
//   res.send({
//    status: 200,
//    message: "创建链接成功",
//    swiper: swiper,
//   });
//  }
// };

// //获取轮播图列表
// exports.swiperlist = async (req, res) => {
//  const swiper = await Swiper.find({});
//  if (!swiper) {
//   return res.send({
//    status: 400,
//    message: "获取链接列表失败！",
//   });
//  } else {
//   res.send({
//    status: 200,
//    message: "获取链接列表成功！",
//    swiper: swiper,
//   });
//  }
// };
// //获取需要修改的轮播图
// exports.getswiper = async (req, res) => {
//  console.log(req);
//  const swiper = await Swiper.findOne({ _id: req.query.id });
//  if (!swiper) {
//   return res.send({
//    status: 400,
//    message: "获取友情链接信息失败！",
//   });
//  } else {
//   res.send({
//    status: 200,
//    message: "获取友情链接信息成功！",
//    swiper: swiper,
//   });
//  }
// };
// // 修改轮播图信息
// exports.updateswiper = async (req, res) => {
//  const swiper = await Swiper.findOneAndUpdate(
//   { _id: req.body._id },
//   {
//    $set: {
//     img: req.body.img,
//     url: req.body.url,
//     description: req.body.description,
//    },
//   },
//   { new: true }
//  );
//  if (!swiper) {
//   return res.send({
//    status: 400,
//    message: "更新友情链接信息失败！",
//   });
//  } else {
//   res.send({
//    status: 200,
//    message: "更新友情链接信息成功！",
//    swiper: swiper,
//   });
//  }
// };
// // 删除轮播图
// exports.deleteswiper = async (req, res) => {
//  const flag = await Swiper.findOneAndDelete({ _id: req.query.id });
//  if (!flag) {
//   return res.send({
//    status: 400,
//    message: "删除失败",
//   });
//  } else {
//   res.send({
//    status: 200,
//    message: "删除成功",
//   });
//  }
// };

// //添加每日一句
// exports.beautiful = async (req, res) => {
//  // console.log(req.body);
//  // const { img, url, description } = req.body;
//  const beautiful = await Beautiful.create({ title: req.body.title });
//  // res.send(friendly)
//  if (!beautiful) {
//   return res.send({
//    status: 400,
//    message: "添加每日一句失败！",
//   });
//  } else {
//   res.send({
//    status: 200,
//    message: "添加每日一句成功！",
//    beautiful: beautiful,
//   });
//  }
// };
// //获取每日一句列表
// exports.beautifullist = async (req, res) => {
//  const beautiful = await Beautiful.find({});
//  if (!beautiful) {
//   return res.send({
//    status: 400,
//    message: "获取链接列表失败！",
//   });
//  } else {
//   res.send({
//    status: 200,
//    message: "获取链接列表成功！",
//    beautiful: beautiful,
//   });
//  }
// };
// // 删除每日一句
// exports.deletebeautiful = async (req, res) => {
// //  console.log(req);
//  const flag = await Beautiful.findOneAndDelete({ _id: req.query.id });
//  if (!flag) {
//   return res.send({
//    status: 400,
//    message: "删除失败",
//   });
//  } else {
//   res.send({
//    status: 200,
//    message: "删除成功",
//   });
//  }
// };
// //获取需要修改的每日一句
// exports.getbeautiful = async (req, res) => {
//   // console.log(req);
//   const beautiful = await Beautiful.findOne({ _id: req.query.id });
//   if (!beautiful) {
//    return res.send({
//     status: 400,
//     message: "获取每日一句失败！",
//    });
//   } else {
//    res.send({
//     status: 200,
//     message: "获取每日一句成功！",
//     beautiful: beautiful,
//    });
//   }
// };
// // 修改每日一句
// exports.updatebeautiful = async (req, res) => {
//   const beautiful = await Beautiful.findOneAndUpdate({ _id: req.body._id }, { $set: { title: req.body.title }}, { new: true });
//   if (!beautiful) {
//    return res.send({
//     status: 400,
//     message: "更新信息失败！",
//    });
//   } else {
//    res.send({
//     status: 200,
//     message: "更新信息成功！",
//     beautiful: beautiful,
//    });
//   }
// };

// //添加图片
// exports.img = async (req, res) => {
//   // console.log(req.body);
//   const { img, title, description } = req.body;
//   const content = await Imgbed.create({ title: title, img: img, description: description });
//   // res.send(friendly)
//   if (!content) {
//    return res.send({
//     status: 400,
//     message: "添加失败！",
//    });
//   } else {
//    res.send({
//     status: 200,
//     message: "添加成功！",
//     content: content,
//    });
//   }
//  };
//  //获取图片列表
//  exports.imglist = async (req, res) => {
//   const img = await Imgbed.find({}).sort({time: -1});
//   if (!img) {
//    return res.send({
//     status: 400,
//     message: "获取列表失败！",
//    });
//   } else {
//    res.send({
//     status: 200,
//     message: "获取列表成功！",
//     img: img,
//    });
//   }
//  };
//  // 删除图片
//  exports.deleteimg = async (req, res) => {
//  //  console.log(req);
//   const flag = await Imgbed.findOneAndDelete({ _id: req.query.id });
//   if (!flag) {
//    return res.send({
//     status: 400,
//     message: "删除失败",
//    });
//   } else {
//    res.send({
//     status: 200,
//     message: "删除成功",
//    });
//   }
//  };
//  //获取需要修改的图片
//  exports.getimg = async (req, res) => {
//   //  console.log(req);
//    const img = await Imgbed.findOne({ _id: req.query.id });
//    if (!img) {
//     return res.send({
//      status: 400,
//      message: "获取每日一句失败！",
//     });
//    } else {
//     res.send({
//      status: 200,
//      message: "获取每日一句成功！",
//      img: img,
//     });
//    }
//  };
//  // 修改图片
//  exports.updateimg = async (req, res) => {
//   //  console.log(res)
//    const img = await Imgbed.findOneAndUpdate({ _id: req.body._id }, { $set: { title: req.body.title, img: req.body.img, description: req.body.description }}, { new: true });
//    if (!img) {
//     return res.send({
//      status: 400,
//      message: "更新信息失败！",
//     });
//    } else {
//     res.send({
//      status: 200,
//      message: "更新信息成功！",
//      img: img,
//     });
//    }
//  };

//  //添加个人信息
// exports.userinfo = async (req, res) => {
//   const {title, img, description } = req.body;
//   const userinfo = await Userinfo.create({ title: title, img: img, description: description });
//   if (!userinfo) {
//    return res.send({
//     status: 400,
//     message: "添加失败！",
//    });
//   } else {
//    res.send({
//     status: 200,
//     message: "添加成功！",
//     userinfo: userinfo,
//    });
//   }
//  };
//  //获取个人信息列表
//  exports.userinfolist = async (req, res) => {
//   const userinfo = await Userinfo.find({});
//   if (!userinfo) {
//    return res.send({
//     status: 400,
//     message: "获取列表失败！",
//    });
//   } else {
//    res.send({
//     status: 200,
//     message: "获取列表成功！",
//     userinfo: userinfo,
//    });
//   }
//  };
//  // 删除个人信息
//  exports.deleteuserinfo = async (req, res) => {
//   // console.log(req);
//   const flag = await Userinfo.findOneAndDelete({ _id: req.query.id });
//   if (!flag) {
//    return res.send({
//     status: 400,
//     message: "删除失败",
//    });
//   } else {
//    res.send({
//     status: 200,
//     message: "删除成功",
//    });
//   }
//  };
//  //获取需要修改的个人信息
//  exports.getuserinfo = async (req, res) => {
//   //  console.log(req);
//    const userinfo = await Userinfo.findOne({ _id: req.query.id });
//    if (!userinfo) {
//     return res.send({
//      status: 400,
//      message: "获取失败！",
//     });
//    } else {
//     res.send({
//      status: 200,
//      message: "获取成功！",
//      userinfo: userinfo,
//     });
//    }
//  };
//  // 修改个人信息
//  exports.updateuserinfo = async (req, res) => {
//    const { title, img, description } = req.body
//    const userinfo = await Userinfo.findOneAndUpdate({ _id: req.body._id }, { $set: { title: title, img: img, description: description }}, { new: true });
//    if (!userinfo) {
//     return res.send({
//      status: 400,
//      message: "更新信息失败！",
//     });
//    } else {
//     res.send({
//      status: 200,
//      message: "更新信息成功！",
//      userinfo: userinfo,
//     });
//    }
//  };