const express = require('express')
const app = express()
// require('dotenv').config();
// const dotenv = require('dotenv')
// dotenv.config({ path: __dirname + '/.env' });
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const cors = require('cors');
// const path = require("path");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
app.use(express.static(path.join(__dirname, "client", "build")));
const corsConfig = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authorization")
    next()
})

const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/users.js');
const videoRoutes = require("./routes/videos.js");
const commentRoutes = require("./routes/comments.js");
const cookieParser = require('cookie-parser');




//db connect
const connect = () => {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.glu2qtp.mongodb.net/?retryWrites=true&w=majority`
    mongoose.connect(uri).then(() => {
        console.log('connected to mongoDb');
    }).catch((err) => {
        throw err;
    })
}


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
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
    connect()
    console.log('listening to port', port);
})