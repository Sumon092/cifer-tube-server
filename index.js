const express = require('express')
const app = express()
require('dotenv').config();
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/users.js');
const videoRoutes = require("./routes/videos.js");
const commentRoutes = require("./routes/comments.js");
const cookieParser = require('cookie-parser');




//db connect
const connect = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('connected to mongoDb');
    }).catch((err) => {
        throw err;
    })
}

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/videos', videoRoutes)
app.use('/api/comments', commentRoutes)

// catch error
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message
    })
})


app.listen(port, () => {
    connect()
    console.log('listening to port', port);
})