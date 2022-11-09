const createError = require('../error.js');
const User = require('../models/User.js');
const Video = require('../models/Video.js');
const mongoose = require('mongoose');

// update user
const update = async (req, res, next) => {
    if (req.params.id === req.user.id) {

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },
                { new: true }
            )
            // console.log("updated", updatedUser);


            res.status(200).json(updatedUser);
        } catch (err) {
            next(err);
        };

    }
    else {
        return next(createError(403, "You can only update your account"));
    };
};

// delete a user
const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {

        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json('User has been deleted');
        } catch (err) {
            next(err);
        };

    }
    else {
        return next(createError(403, "You can only delete your account"));
    };
}
const getUsers = async (req, res, next) => {
    // const users = req.body;
    try {
        const user = await User.find(req.body)
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}
const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}
const sub = async (req, res, next) => {

    try {
        await User.findByIdAndUpdate(req.params.id, {
            $push: { subscribedUsers: req.params.id }
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 }
        });
        res.status(200).json("Subscription successful")
    } catch (error) {

    }

}
const unSub = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.params.id, {
            $pull: { subscribedUsers: req.params.id }
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 }
        });
        res.status(200).json("Unsubscription successful")
    } catch (error) {

    }
}
const like = async (req, res, next) => {

    // const id = req.user.id
    // console.log(user.findOne(req.params.id));
    const id = mongoose.Types.ObjectId();
    // console.log("user is", id)
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            $pull: { disLikes: id }
        });
        res.status(200).json("The video has been liked");
    } catch (error) {
        next(error)
    }

}
const disLike = async (req, res, next) => {
    // const id = req.users.id;
    // const id = mongoose.users.Types.ObjectId();
    // console.log("dislike id", id);
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { disLikes: id },
            $pull: { likes: id }
        });
        res.status(200).json("The video has been disliked");
    } catch (error) {
        next(error)
    }
}



module.exports = {
    update,
    deleteUser,
    getUser,
    sub,
    unSub,
    like,
    disLike,
    getUsers
};