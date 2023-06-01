const express = require('express');
const router = express.Router();

const { StudentController } = require('../controllers');
const { ValidateRequestRouteParameterMiddleware, ValidateRequestBodyMiddleware } = require('../middlewares');

const { AddStudentSchema, UpdateStudentSchema, ValidateIdSchema, AssignStudentToCourseSchema } = require('../schemas');

router.get('/', StudentController.getAll);
router.get('/:id', StudentController.getById);
router.post('/', ValidateRequestBodyMiddleware(AddStudentSchema), StudentController.add);
router.put('/:id', ValidateRequestRouteParameterMiddleware(ValidateIdSchema), ValidateRequestBodyMiddleware(UpdateStudentSchema), StudentController.update);
router.patch('/:studentId/assign-course/:courseId', ValidateRequestRouteParameterMiddleware(AssignStudentToCourseSchema), StudentController.assignCourse);
router.delete('/:id', ValidateRequestRouteParameterMiddleware(ValidateIdSchema), StudentController.remove);

module.exports = router;
