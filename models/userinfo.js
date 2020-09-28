const mongoose = require('mongoose');
const userinfoSchema = new mongoose.Schema({
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
    }
})

const Userinfo = mongoose.model('Userinfo', userinfoSchema);
module.exports = Userinfo;