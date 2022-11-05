
const express = require('express');
const verifyJwt = require('../verifyJwt.js');
const { update, deleteUser, getUser, sub, unSub, like, disLike } = require('../controllers/user.js');

const router = express.Router();

//update user
router.put('/:id', verifyJwt, update);
//delete user
router.delete('/:id', verifyJwt, deleteUser)
//get a user
router.get('/find/:id', getUser)
//subscribe a user
router.put('/sub/:id', sub)
//unsubscribe a user
router.put('/unSub/:id', unSub)
//like a video
router.put('/like/:videoId', like);
// dislike a video
router.put('/disLike/:videoId', disLike);


module.exports = router;