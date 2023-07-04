const express = require('express');
const { Router } = express;

const router = Router();

const { NotesController } = require('../controllers');

router.get('/', NotesController.getNotesPaginated);
router.get('/:id', NotesController.getNoteById);

module.exports = router;
