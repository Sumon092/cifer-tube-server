// const express = require('express')
import express from "express";
const app = express()
// require('dotenv').config();
import dotenv from "dotenv";
dotenv.config();
// const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;
// const mongoose = require('mongoose');
import mongoose from "mongoose";
// import mongoose from "mongoose"
import userRoutes from "./routes/users.js";
// const cors = require('cors');
// import cors from "node:child_process"
const corsConfig = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}
// app.use(cors(corsConfig))
// app.options("*", cors(corsConfig))
app.use(express.json())
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*")
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authorization")
//     next()
// });





const connect = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('connected to db');
    }).catch((err) => {
        throw err;
    })
}

app.use('/api/users', userRoutes)


app.listen(port, () => {
    connect()
    console.log('listening to port', port);
})