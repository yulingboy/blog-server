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
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  //评论时间
  time: {
    type: Date,
    default: Date.now
  },
  //评论内容
  content: {
    type:String
  }
})
// 根据规则创建集合
const Comment = mongoose.model('Comment', commentSchema);
// 将文章集合进行导出
module.exports = Comment
