const mongoose = require('mongoose');
const beautifulSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
})

const Beautiful = mongoose.model('Beautiful', beautifulSchema);
module.exports = Beautiful;