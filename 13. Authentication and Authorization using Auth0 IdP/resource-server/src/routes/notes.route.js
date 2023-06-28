const express = require('express');
const router = express.Router();

const { NotesController } = require('../controllers');

const { CheckPermissionsMiddleware } = require('../middlewares');

router.get('/', CheckPermissionsMiddleware('read:notes'), NotesController.getAll);

module.exports = router;
