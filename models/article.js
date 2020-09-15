const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 20,
    minlength: 4,
    required: [true, "请输入文章标题"]
  },
  // author: { 
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: [true, '请传递作者']
  // },
  publishDate: {
    type: Date,
    default: Date.now
  },
  cover: {
    type: String,
    default: `http://images.bianxiaofeng.com/ced846eab08578468670a87333e05b5f.jpg`
  },
  content: {
    type: String
  },
  classify: {
    type: String,
    default: null
  },
  tag: {
    type: Array,
    default: null
  },
  view: { //阅读人数  
    type: Number,
    default: 0
  },
  comments: { //评论
    type: Number,
    default: 0
  },
  isPublish: { //0为未发布 1为已发布
    type: Boolean
    // default: 0
  },
  isHot: { //是否推荐 0：不推荐 1：推荐
    type: Boolean
    // default: 0
  },
  description: {
    type: String,
    default: null
  }
})
const Article = mongoose.model('Article', articleSchema);
module.exports = Article;