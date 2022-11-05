const Video = require("../models/Video.js");
const Comment = require("../models/Comment.js");
const createError = require("../error.js");

// Create a comment 
const addComment = async (req, res, next) => {
    const newComment = new Comment({ ...req.body, userId: req.user.id })
    try {
        const savedComment = await newComment.save()
        res.status(200).json(savedComment);
    } catch (error) {
        next(error)
    }
};


const deleteComment = async (req, res, next) => {

    try {
        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(req.params.id);

        if (req.user.id === comment.userId || req.user.id === video.userId) {
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json('The comment has been deleted')
        } else {
            return next(createError(403, "You can delete only your comment"))
        }
    } catch (error) {
        next(error)
    }
};


const getComments = async (req, res, next) => {
    try {
        const comment = await Comment.find({ videoId: req.params.videoId });
        res.status(200).json(comment)
    } catch (error) {
        next(error)
    }
};

module.exports = {
    addComment,
    deleteComment,
    getComments

}