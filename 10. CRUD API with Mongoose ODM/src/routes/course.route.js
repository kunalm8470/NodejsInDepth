const express = require('express');
const router = express.Router();

const { CourseController } = require('../controllers');

router.get('/', CourseController.getAllCourses);

module.exports = router;
