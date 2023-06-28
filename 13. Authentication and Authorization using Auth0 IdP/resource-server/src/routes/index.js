const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    return res.send('Resource server');
});

router.use('/api/notes', require('./notes.route'));

module.exports = router;