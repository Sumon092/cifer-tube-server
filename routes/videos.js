const express = require('express');
const { updateVideo, deleteVideo, getVideo, addVideo, addView, random, trend, subscribe, getByTag, search, } = require('../controllers/video.js');
const verifyToken = require('../verifyJwt.js');

const router = express.Router();

// create video
router.post('/', addVideo);
router.post('/:id', verifyToken, updateVideo);
router.delete('/:id', verifyToken, deleteVideo);
router.get('/find/:id', getVideo);
router.put('/view/:id', addView);
router.get('/random', random);
router.get('/trend', trend);
router.get("/subscribed", subscribe);
router.get("/tags", getByTag);
router.get("/search", search);

//delete user


//get a user

//subscribe a user

//unsubscribe a user

//like a video

// dislike a video


module.exports = router;