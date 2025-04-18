const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    desc:{
        type:String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    deadLineAt: {
        type: Date,
        default: Date.now,
    },
    category: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('List', listSchema);