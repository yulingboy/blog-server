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
    }
})

const Imgbed = mongoose.model('Imgbed', imgSchema);
module.exports = Imgbed;