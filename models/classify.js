// 导入mongoose模块
const mongoose = require('mongoose');
// 创建分类集合规则
const classifySchema = new mongoose.Schema({
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
  //添加时间
  time: {
    type: Date,
    default:Date.now
  },
  //内容
  classify: {
    type:String
  }
})
// 根据规则创建集合
const Classify = mongoose.model('Classify', classifySchema);
// 将分类集合进行导出
module.exports = Classify