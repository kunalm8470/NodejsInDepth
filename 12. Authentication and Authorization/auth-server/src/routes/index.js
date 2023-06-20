const express = require('express');
const { StatusCodes } = require('http-status-codes');
const router = express.Router();

router.get('/', (req, res, next) => {
    return res.status(StatusCodes.OK).json({ 
        message: 'Auth Server' 
    });
});

router.get('/ping', (req, res, next) => {
    return res.status(StatusCodes.OK).json({ 
        message: 'Pong' 
    });
});

router.use('/api/Account', require('./account.route'));

module.exports = router;
