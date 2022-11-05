// import express from 'express';
const express = require('express');
const { addComment, deleteComment, getComments } = require('../controllers/comment.js');
const verifyJwt = require('../verifyJwt.js');

const router = express.Router();

router.post('/', verifyJwt, addComment)
router.delete('/:id', verifyJwt, deleteComment)
router.post('/:videoId', getComments)

module.exports = router;