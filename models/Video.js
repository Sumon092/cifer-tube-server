const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    video: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    videoTitle: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        required: true,
    },
    views: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String],
        default: []
    },
    likes: {
        type: [String],
        default: 0
    },
    dislikes: {
        type: [String],
        default: 0
    },

}, { timestamps: true });

module.exports = mongoose.model("Video", videoSchema);