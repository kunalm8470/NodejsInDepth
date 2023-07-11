const express = require('express');
const { Router } = express;

const router = Router();

const { JobsController } = require('../controllers');

router.post('/send-email', JobsController.sendEmail);

module.exports = router;
