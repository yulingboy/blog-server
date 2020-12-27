const mongoose = require('mongoose');
const imgSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    },
    view: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 0 // 0:未审核 1：审核通过 2： 审核未通过
    }
})

const Imgbed = mongoose.model('Imgbed', imgSchema);
module.exports = Imgbed;