const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    return res.send('API gateway');
});

router.use('/api/jobs', require('./jobs.route'));

module.exports = router;