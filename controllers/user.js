const createError = require('../error.js');
const User = require('../models/User.js');

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
const like = (req, res, next) => {

}
const disLike = (req, res, next) => {

}



module.exports = {
    update,
    deleteUser,
    getUser,
    sub,
    unSub,
    like,
    disLike
};