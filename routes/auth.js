const express = require('express');
const { signup, signIn } = require('../controllers/auth.js')

const router = express.Router();

router.post('/signup', signup)
router.post('/signIn', signIn)


module.exports = router;