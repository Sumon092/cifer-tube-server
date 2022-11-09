
const express = require('express');
const verifyJwt = require('../verifyJwt.js');
const { update, deleteUser, getUser, sub, unSub, like, disLike, getAllUser, getUsers } = require('../controllers/user.js');

const router = express.Router();

//update user
router.put('/allUser', verifyJwt, getUsers);
router.put('/two/:id', verifyJwt, update);
//delete user
router.delete('/three/:id', verifyJwt, deleteUser)
//get a user
router.get('/find/:id', getUser)
//subscribe a user
router.put('/sub/:id', sub)
//unsubscribe a user
router.put('/unSub/:id', unSub)
//like a video
router.put('/likes/:videoId', like);
// dislike a video
router.put('/disLikes/:videoId', disLike);


module.exports = router;