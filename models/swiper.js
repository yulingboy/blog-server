const mongoose = require('mongoose');
const swiperSchema = new mongoose.Schema({
    img: {
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
        type: String
    }
})

const Swiper = mongoose.model('Swiper', swiperSchema);
module.exports = Swiper;