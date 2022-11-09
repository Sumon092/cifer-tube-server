// import express from 'express';
const express = require('express');
const { addComment, deleteComment, getComments } = require('../controllers/comment.js');
const verifyJwt = require('../verifyJwt.js');

const router = express.Router();

// router.post('/', verifyJwt, addComment)
router.delete('/four/:id', verifyJwt, deleteComment)
router.get('/five/:videoId', getComments)

module.exports = router;