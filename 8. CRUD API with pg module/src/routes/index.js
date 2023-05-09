const { Router } = require('express');

const router = Router();

router.use('/api/Notes', require('./notes.route'));

module.exports = router;
