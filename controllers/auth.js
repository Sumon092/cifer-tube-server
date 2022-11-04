const bcrypt = require('bcryptjs');
const User = require("../models/User.js");
const createError = require('../error.js');
const jwt = require('jsonwebtoken');


const signup = async (req, res, next) => {
    // try {
    //     const salt =await bcrypt.genSaltSync(10);
    //     const hash =await bcrypt.hashSync(req.body.password, salt);

    //     const newUser = new User({ ...req.body, password: hash });
    //     await newUser.save();
    //     res.status(200).send('user added successfully');
    // } catch (err) {
    //     next(err)
    // }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({ ...req.body, password: hash });
    console.log(newUser);

    try {
        await newUser.save();
        res.status(200).send('user added successfully');
    } catch (err) {
        next(err)
    }



}
const signIn = async (req, res, next) => {
    try {
        const user = await User.findOne({ name: req.body.name });
        if (!user) {
            return next(createError(404, "User not found"))
        }
        const isCorrect = await bcrypt.compare(req.body.password, user.password);

        if (!isCorrect) {
            return next(createError(400, "Wrong Credential"))
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT);
        const { password, ...other } = user._doc;
        return res.cookie("access-token", token, {
            httpOnly: true
        }).status(200).json(other);

    } catch (err) {
        next(err)
    }
}
module.exports = {
    signup, signIn
};