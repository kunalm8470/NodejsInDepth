const express = require('express');
const { StatusCodes } = require('http-status-codes');
const router = express.Router();

router.get('/', (req, res, next) => {
    return res.status(StatusCodes.OK).json({ 
        message: 'Fake University Server' 
    });
});

router.get('/ping', (req, res, next) => {
    return res.status(StatusCodes.OK).json({ 
        message: 'Pong' 
    });
});

router.use('/api/courses', require('./course.route'));
router.use('/api/students', require('./student.route'));

module.exports = router;
