const Classify = require('../../models/classify');
// 添加分类标签
exports.classify = async (req, res) => {
    const { classify } = req.body;
    const classes = await Classify.findOne({ classify: classify });
    if (classes) {
     return res.send({
      status: 400,
      message: "该分类已经存在",
     });
    } else {
     await Classify.create({ classify: classify });
     res.send({
      status: 200,
      message: "分类添加成功",
     });
    }
   };
   //查询分类标签
   exports.classifylist = async (req, res) => {
    const classifylist = await Classify.find({});
    if (classifylist.length <= 0) {
     return res.send({
      meta: {
        status: 400,
        message: "获取分类分类失败",
      }
     });
    } else {
     res.send({
      meta: {
        status: 200,
        message: "获取分类分类成功",
      },
      data: classifylist,
     });
    }
   };
   // 删除分类分类
   exports.deleteclassify = async (req, res) => {
    const flag = await Classify.findOneAndDelete({ _id: req.query.id });
    if (!flag) {
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
   };
   // 获取需要修改的分类分类
   exports.getclassify = async (req, res) => {
    // console.log(req.query);
    const classify = await Classify.findOne({ _id: req.query.id });
    if (!classify) {
     return res.send({
      status: 400,
      message: "获取分类信息失败",
     });
    } else {
     res.send({
      status: 200,
      message: "获取分类信息成功",
      classify: classify,
     });
    }
   };
   // 修改分类
   exports.editclassify = async (req, res) => {
    // console.log(req);
    const classify = await Classify.findOneAndUpdate(
     { _id: req.body._id },
     { $set: { classify: req.body.classify } },
     { new: true }
    );
    if (!classify) {
     return res.send({
      status: 400,
      message: "获取分类信息失败",
     });
    } else {
     res.send({
      status: 200,
      message: "获取分类信息成功",
      classify: classify,
     });
    }
   };