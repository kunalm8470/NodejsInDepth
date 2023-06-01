const { Student, Course, StudentCourse } = require('../models');
const StudentNotFoundError = require('../errors/student-not-found.error');
const CourseNotFoundError = require('../errors/course-not-found.error');

class StudentsService {
    constructor() {
        this.getStudentById = this.getStudentById.bind(this);
        this.getStudentsOffsetPaginated = this.getStudentsOffsetPaginated.bind(this);
        this.addStudent = this.addStudent.bind(this);
        this.updateStudent = this.updateStudent.bind(this);
        this.removeStudent = this.removeStudent.bind(this);
    }

    async getStudentById(id) {
        const foundStudent = await Student.findByPk(id, {
            include: [
                {
                    model: Course,
                    as: 'courses', // Alias of the joined rows
                    through: {
                        attributes: [] // We are excluding the junction table
                    },
                    attributes: {
                        exclude: [
                            'id', // Ignore courseid
                            'createdAt', // Ignore course createdAt
                            'updatedAt' // Ignore course updatedAt
                        ]
                    }
                }
            ]
        });

        if (foundStudent === null) {
            throw new StudentNotFoundError(`Student not found with id: ${id}`);
        }

        return foundStudent;
    }

    async getStudentsOffsetPaginated(page, limit) {
        const skip = (page - 1) * limit;

        const students = await Student.findAll({
            include: [
                {
                    model: Course,
                    as: 'courses',
                    through: {
                        attributes: []
                    },
                    attributes: {
                        exclude: [
                            'id',
                            'createdAt',
                            'updatedAt'
                        ]
                    }
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ],
            offset: skip,
            limit: limit
        });

        return students;
    }

    async addStudent(name, age, email) {
        await Student.create({
            name: name,
            age: age,
            email: email,
            createdAt: new Date().toISOString()
        });
    }

    async updateStudent(id, name, age, email) {
        const student = await Student.findByPk(id);

        if (student === null) {
            throw new StudentNotFoundError(`Student not found with id: ${id}`);
        }

        await student.update({
            name: name,
            age: age,
            email: email,
            updatedAt: new Date().toISOString()
        });
    }

    async assignCourseToStudent(studentId, courseId) {
        const foundStudent = await Student.findByPk(studentId, {
            include: [
                {
                    model: Course,
                    as: 'courses', // Alias of the joined rows
                    through: {
                        attributes: [] // We are excluding the junction table
                    },
                    attributes: {
                        exclude: [
                            'id', // Ignore courseid
                            'createdAt', // Ignore course createdAt
                            'updatedAt' // Ignore course updatedAt
                        ]
                    }
                }
            ]
        });

        if (foundStudent === null) {
            throw new StudentNotFoundError(`Student not found with id: ${studentId}`);
        }

        const foundCourse = await Course.findByPk(courseId);

        if (foundCourse === null) {
            throw new CourseNotFoundError(`Course not found with id: ${courseId}`);
        }

        // Special method added by Sequelize on the model's instance
        // See more at - https://sequelize.org/docs/v6/core-concepts/assocs/#special-methodsmixins-added-to-instances
        foundStudent.addCourses(foundCourse);
    }

    async removeStudent(id) {
        const foundStudent = await Student.findByPk(id);

        if (foundStudent === null) {
            throw new StudentNotFoundError(`Student not found with id: ${id}`);
        }

        // Deleting the child table reference
        const studentCourses = await StudentCourse.findAll({
            where: {
                studentId: id
            }
        });

        for (const studentCourse of studentCourses) {
            await studentCourse.destroy();
        }

        // Hard delete (Parent table reference)
        await foundStudent.destroy();
    }
}

module.exports = new StudentsService();
