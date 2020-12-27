// 导入mongoose模块
const mongoose = require('mongoose');
// const { string } = require('joi');
// 创建文章集合规则
const commentSchema = new mongoose.Schema({
  //文章ID
  aid: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Article'
  },
  //用户ID
  // uid: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref:'User'
  // },
  // 昵称
  nickname: {
    type: String,
    required: true
  },
  // 邮箱
  email: {
    type: String,
    required: true
  },
  //评论时间
  time: {
    type: Date,
    default: Date.now
  },
  //评论内容
  content: {
    type:String
  },
  status: {
    type: Number,
    default: 0 //0为未审核 1为审核通过 2为审核未通过
  }
})
// 根据规则创建集合
const Comment = mongoose.model('Comment', commentSchema);
// 将文章集合进行导出
module.exports = Comment
