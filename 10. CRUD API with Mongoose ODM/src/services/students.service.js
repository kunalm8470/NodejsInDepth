const mongoose = require('mongoose');
const { Students, Courses } = require('../models');
const { StudentNotFoundError, CourseNotFoundError } = require('../errors');

class StudentsService {
    constructor() {
        this.getStudentById = this.getStudentById.bind(this);
        this.getStudentsOffsetPaginated = this.getStudentsOffsetPaginated.bind(this);
        this.addStudent = this.addStudent.bind(this);
        this.updateStudent = this.updateStudent.bind(this);
        this.removeStudent = this.removeStudent.bind(this);
    }

    async getStudentById(id) {
        const foundStudent = await Students.findById(id)
            .populate('courses')
            .exec();

        if (!foundStudent) {
            throw new StudentNotFoundError(`Student not found with id: ${id}`);
        }

        return foundStudent;
    }

    async getStudentsOffsetPaginated(page, limit) {
        const skip = (page - 1) * limit;

        // Empty object filter, which means select all
        const filter = {};

        const students = await Students
            .find(filter)
            .populate('courses')
            .skip(skip)
            .limit(limit)
            .exec();

        return students;
    }

    async addStudent(name, age, email) {
        const newStudent = new Students({
            name,
            email,
            age
        });

        // .save method should be called on instance of the model
        await newStudent.save();

        return newStudent;
    }

    async updateStudent(id, name, age, email) {
        const found = await Students.findById(id).exec();

        if (!found) {
            throw new StudentNotFoundError(`Student not found with id: ${id}`);
        }

        const filter = {
            _id: new mongoose.Types.ObjectId(id)
        };

        const payload = {
            name,
            age,
            email
        };

        await Students.updateOne(filter, payload).exec();
    }

    async assignCourseToStudent(studentId, courseId) {
        const foundStudent = await Students.findById(studentId).exec();

        if (!foundStudent) {
            throw new StudentNotFoundError(`Student not found with id: ${id}`);
        }

        const foundCourse = await Courses.findById(courseId).exec();

        if (!foundCourse) {
            throw new CourseNotFoundError(`Course not found with id: ${id}`);
        }

        foundStudent.courses.push(foundCourse);

        await foundStudent.save();

        return foundStudent;
    }

    async removeStudent(id) {
        const foundStudent = await Students.findById(id).exec();

        if (!foundStudent) {
            throw new StudentNotFoundError(`Student not found with id: ${id}`);
        }

        const filter = {
            _id: new mongoose.Types.ObjectId(id)
        };

        await Students.deleteOne(filter).exec();
    }
}

module.exports = new StudentsService();
