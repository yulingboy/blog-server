const mongoose = require('mongoose');

const connectionDB = async () => {
  try {
    mongoose.set('useCreateIndex', true)
    mongoose.set('useFindAndModify', false)
    await mongoose.connect('mongodb://localhost/new_blog', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('数据库连接成功！');
  } catch (e) {
    console.log(e);
  }
}
module.exports = connectionDB;