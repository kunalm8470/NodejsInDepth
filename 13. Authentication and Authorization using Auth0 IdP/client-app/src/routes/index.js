const express = require('express');
const router = express.Router();

const { AccountController, NotesController } = require('../controllers');

router.get('/', AccountController.renderHomePage);
router.get('/signup', AccountController.renderSignupPage);

router.get('/profile', AccountController.renderProfilePage);
router.get('/notes', NotesController.renderNotes);

module.exports = router;
