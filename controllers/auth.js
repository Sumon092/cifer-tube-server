const bcrypt = require('bcryptjs');
const User = require("../models/User.js");
const createError = require('../error.js');
const jwt = require('jsonwebtoken');

// create user
const signup = async (req, res, next) => {

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
};

// signIn user
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

        return res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(other);
    } catch (err) {
        next(err)
    }
}

// google sign in
const googleAuth = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT);
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json(user._doc);
      } else {
        const newUser = new User({
          ...req.body,
          fromGoogle: true,
        });
        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json(savedUser._doc);
      }
    } catch (err) {
      next(err);
    }
}
module.exports = {
    signup, signIn, googleAuth
};