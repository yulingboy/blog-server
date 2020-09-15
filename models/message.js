// 导入mongoose模块
const mongoose = require('mongoose');
// const { string } = require('joi');
// 创建文章集合规则
const messageSchema = new mongoose.Schema({
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
  }
})
// 根据规则创建集合
const Message = mongoose.model('Message', messageSchema);
// 将文章集合进行导出
module.exports = Message
