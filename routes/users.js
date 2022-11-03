// import express from 'express';
const mongoose = require('mongoose');
const express = require('express');
// import { test } from '../controllers/user.js';
const { test } = require('../controllers/user.js')

const router = express.Router();

router.get('/test', test)
module.exports = router;