const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require("../models/User.js")
// console.log(User);
const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });
        await newUser.save();
        res.status(200).send('user added successfully');
    } catch (err) {
        next(err)
    }
}
module.exports = {
    signup
};