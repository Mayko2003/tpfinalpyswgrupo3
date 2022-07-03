const express = require('express');
const emailController = require('../controllers/email.controller');
const authController = require('../controllers/auth.controller');
const router = express.Router();

router.post('/send', authController.verifyToken, emailController.sendEmail)


module.exports = router;