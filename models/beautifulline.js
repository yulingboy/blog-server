const mongoose = require('mongoose');
const beautifulSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 0 //0为审核 1 审核通过 2 审核未通过
    },
    time: {
        type: Date,
        default: Date.now
    }
})

const Beautiful = mongoose.model('Beautiful', beautifulSchema);
module.exports = Beautiful;