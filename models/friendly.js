const mongoose = require('mongoose');
const friendlySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        default: "该网站还没有描述哦"
    },
    status: {
        type: Number,
        default: 0 // 0:未审核 1：审核通过 2：审核未通过
    }
})

const Friendly = mongoose.model('Friendly', friendlySchema);
module.exports = Friendly;