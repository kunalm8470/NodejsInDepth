const AddStudentSchema = require('./students/add-student.schema');
const UpdateStudentSchema = require('./students/update-student.schema');
const ValidateIdSchema = require('./students/validate-id.schema');
const AssignStudentToCourseSchema = require('./students/assign-student-to-course.schema');

module.exports = {
    AddStudentSchema,
    UpdateStudentSchema,
    ValidateIdSchema,
    AssignStudentToCourseSchema
};
