// import mongoose from "mongoose";
// const express = require('express');
const { mongoose } = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
    },
    subscribers: {
        type: Number,
        default: 0
    },
    subscribedUsers: {
        type: [String],
    }
}, { timestamps: true });

// module.exports = mongoose.models("User", UserSchema);