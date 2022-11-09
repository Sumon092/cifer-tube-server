const express = require('express');
const { signup, signIn, googleAuth } = require('../controllers/auth.js')

const router = express.Router();

router.post('/signup', signup)
router.post('/signIn', signIn)
router.post('/google', googleAuth)


module.exports = router;