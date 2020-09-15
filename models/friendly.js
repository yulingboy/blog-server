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
        type: String
    }
})

const Friendly = mongoose.model('Friendly', friendlySchema);
module.exports = Friendly;