const { StatusCodes } = require('http-status-codes'); 
const { StudentService } = require('../services');
const { DuplicateStudentEmailError } = require('../errors');

class StudentController {
    constructor() {
        this.getById = this.getById.bind(this);
        this.getAll = this.getAll.bind(this);
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.assignCourse = this.assignCourse.bind(this);
        this.remove = this.remove.bind(this);
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;

            const student = await StudentService.getStudentById(id);

            return res.status(StatusCodes.OK).json(student);
        } catch (err) {
            return next(err);
        }
    }

    async getAll(req, res, next) {
        try {
            const page = parseInt(req.query.page || 1);
            const limit = parseInt(req.query.limit || 10);

            const students = await StudentService.getStudentsOffsetPaginated(page, limit);

            return res.status(StatusCodes.OK).json(students);
        } catch (err) {
            return next(err);
        }
    }

    async add(req, res, next) {
        try {
            const { name, age, email } = req.body;

            await StudentService.addStudent(name, age, email);

            res.status(StatusCodes.CREATED);

            return res.end();
        } catch (err) {
            // Handle unique index violation errors
            if (err.code === 11000) {
                return next(new DuplicateStudentEmailError(`Duplicate email: ${err.keyValue.email}`));
            }

            return next(err);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;

            const { name, age, email } = req.body;

            await StudentService.updateStudent(id, name, age, email);

            res.status(StatusCodes.OK);

            return res.end();
        } catch (err) {
            return next(err);
        }
    }

    async assignCourse(req, res, next) {
        try {
            const { studentId, courseId } = req.params;

            await StudentService.assignCourseToStudent(studentId, courseId);

            res.status(StatusCodes.OK);

            return res.end();
        } catch (err) {
            return next(err);
        }
    }

    async remove(req, res, next) {
        try {
            const { id } = req.params;

            await StudentService.removeStudent(id);

            res.status(StatusCodes.NO_CONTENT);

            return res.end();
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new StudentController();
