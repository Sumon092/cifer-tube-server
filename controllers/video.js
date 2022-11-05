const createError = require("../error.js");
const Video = require('../models/Video.js');
const User = require("../models/User.js");
const mongoose = require('mongoose');

const addVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    try {
        const savedVideo = await newVideo.save()
        res.status(200).json(savedVideo)
    } catch (error) {
        next(error)
    }
};

const updateVideo = async (req, res, next) => {

    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "Video not found"));
        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body
                },
                {
                    new: true
                }
            );
            res.status(200).json(updatedVideo)
        } else {
            return next(createError(403, "You can update only your video"));
        }
    } catch (error) {
        next(error)
    }
};

const deleteVideo = async (req, res, next) => {

    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "Video not found"));
        if (req.user.id === video.userId) {
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json("The video has been deleted")
        } else {
            return next(createError(403, "You can delete only your video"));
        }
    } catch (error) {
        next(error)
    }
};

const getVideo = async (req, res, next) => {

    try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video);
    } catch (error) {
        next(error)
    }
};

const addView = async (req, res, next) => {

    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        })
        res.status(200).json("The view has been increased")
    } catch (error) {
        next(error)
    }
};

const random = async (req, res, next) => {

    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }])
        res.status(200).json(videos);
    } catch (error) {
        next(error)
    }
};

const trend = async (req, res, next) => {

    try {
        const video = await Video.find().sort({ views: -1 })
        res.status(200).json(video);
    } catch (error) {
        next(error)
    }
};

const subscribe = async (req, res, next) => {

    try {
        const user = await User.findById(req.user.id);
        const subscribedChannel = user.subscribedUsers;

        const list = await promise.all(
            subscribedChannel.map((channelId) => {
                return Video.find({ userId: channelId })
            })
        );
        return res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt))

    } catch (error) {
        next(error)
    }
};

const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",");
    console.log("tags", tags);

    try {
        const video = await Video.find({ tags: { $in: { tags } } }).limit(20)
        res.status(200).json(video);
    } catch (error) {
        next(error)
    }
};

const search = async (req, res, next) => {
    const query = req.query.q;
    try {
        const video = await Video.find({ videoTitle: { $regex: query, $options: "i" }, }).limit(40)
        res.status(200).json(video);
    } catch (error) {
        next(error)
    }
};


module.exports = {
    addVideo,
    updateVideo,
    deleteVideo,
    getVideo,
    addView,
    random,
    trend,
    subscribe,
    getByTag,
    search
}