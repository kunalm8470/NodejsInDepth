const { assert } = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const { Chance } = require('chance');

const chance = new Chance();

const { Courses, Students } = require('../../../src/models');
const { StudentService } = require('../../../src/services');
const { StudentNotFoundError } = require('../../../src/errors');

afterEach(() => {
    // Clear the mocks after each test
    sinon.restore();
});

describe('StudentService', () => {
    const students = Array.from({ length: 100 }, () => {
        return {
            _id: new mongoose.Types.ObjectId(),
            name: chance.name({
                full: true
            }),
            email: chance.email(),
            age: chance.integer({
                min: 5,
                max: 17
            })
        };
    });

    describe('#getStudentsOffsetPaginated', () => {

        

        it('should return paginated list of students, when valid page and limit is passed', async () => {
            // Arrange
            const page = 2;

            const limit = 2;

            const skip = (page - 1) * limit;

            const findFilter = {};

            const stubStudents = students.slice(skip, skip + limit);
            
            const studentFindStub = sinon.stub(Students, 'find')
            .withArgs(findFilter)
            .returns({
                    populate: (model) => {
                        return {
                            skip: (s) => {
                                return {
                                    limit: (l) => {
                                        return {
                                            exec: () => {
                                                return Promise.resolve(stubStudents);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
            });

            // Act
            const paginatedStudents = await StudentService.getStudentsOffsetPaginated(page, limit);

            // Assert
            assert.strictEqual(paginatedStudents.length, stubStudents.length);
            assert.isTrue(studentFindStub.calledOnce);
        });
    });

    describe('#getStudentById', () => {
        it('should fetch a student details by its id, if valid student id is passed', async () => {
            // Arrange
            const studentId = students[2]._id.toString();

            const studentFindByIdStub = sinon.stub(Students, 'findById')
            .withArgs(studentId)
            .returns({
                populate: (model) => {
                    return {
                        exec: () => {
                            return Promise.resolve(students[2]);
                        }
                    }
                }
            });

            // Act
            await StudentService.getStudentById(studentId);

            // Assert
            assert.isTrue(studentFindByIdStub.calledOnce);
        });

        it('should throw StudentNotFoundError, if non-existent student id is passed', async () => {
            // Arrange
            const studentId = new mongoose.Types.ObjectId().toString();

            const studentFindByIdStub = sinon.stub(Students, 'findById')
            .withArgs(studentId)
            .returns({
                populate: (model) => {
                    return {
                        exec: () => {
                            return Promise.resolve(null);
                        }
                    }
                }
            });

            try {
                // Act
                await StudentService.getStudentById(studentId);
            } catch (err) {
                // Assert
                assert.isTrue(err instanceof StudentNotFoundError);

                assert.strictEqual(err.message, `Student not found with id: ${studentId}`);

                assert.isTrue(studentFindByIdStub.calledOnce);
            }         
        });
    });

    describe('#addStudent', () => {
        it('should save a user whenever valid name, age and email are passed', async () => {
            // Arrange
            const name = 'John Doe';

            const age = 10;

            const email = 'john.doe@fakeuniversity.com';

            const studentObj = {
                name,
                age,
                email 
            };

            sinon.stub(Students.prototype, 'save').resolves({ 
                _id: new mongoose.Types.ObjectId(),
                ...studentObj 
            });

            // Act
            const newStudent = await StudentService.addStudent(name, age, email);

            // Assert
            assert.isTrue(!!newStudent, 'Student object is null');
        });
    });

    describe('#assignCourseToStudent', () => {
        it('should save a assign a course to a student when valid student id and course id are passed', async () => {
            // Arrange
            const studentId = new mongoose.Types.ObjectId().toString();

            const courseId = new mongoose.Types.ObjectId().toString();

            const foundCourse = new Courses({
                _id: new mongoose.Types.ObjectId(studentId),
                name: 'Physics'
            });

            const foundStudent = new Students({
                _id: new mongoose.Types.ObjectId(studentId),
                name: 'John Doe',
                age: 10,
                email: 'john.doe@fakeuniversity.com',
                courses: []
            });

            const studentFindByIdStub = sinon.stub(Students, 'findById')
            .withArgs(studentId)
            .returns({
                exec: () => {
                    return Promise.resolve(foundStudent);
                }
            });

            const courseFindByIdStub = sinon.stub(Courses, 'findById')
            .withArgs(courseId)
            .returns({
                exec: () => {
                    return Promise.resolve(foundCourse);
                }
            });

            sinon.stub(Students.prototype, 'save').resolves({ 
                ...foundStudent,
                courses: [foundCourse]
            });

            // Act
            const assignedCourseStudent = await StudentService.assignCourseToStudent(studentId, courseId);

            // Assert
            assert.isTrue(!!assignedCourseStudent);
            assert.isTrue(studentFindByIdStub.calledOnce);
            assert.isTrue(courseFindByIdStub.calledOnce);
        });
    });

    describe('#updateStudent', () => {
        it('should update a student, if valid id is passed', async () => {
            // Arrange
            const studentId = new mongoose.Types.ObjectId().toString();

            const foundStudent = new Students({
                _id: new mongoose.Types.ObjectId(studentId),
                name: 'John Doe',
                age: 10,
                email: 'john.doe@fakeuniversity.com',
                courses: []
            });

            const studentFindByIdStub = sinon.stub(Students, 'findById')
            .withArgs(studentId)
            .returns({
                exec: () => {
                    return Promise.resolve(foundStudent);
                }
            });

            const updateFilter = {
                _id: new mongoose.Types.ObjectId(studentId)
            };

            const updatePayload = {
                name: 'John2 Doe2',
                age: 12,
                email: 'john2.doe2@fakeuniversity.com'
            };

            const updateResult = {
                acknowledged: true,
                modifiedCount: 1,
                upsertedId: null,
                upsertedCount: 0,
                matchedCount: 1
            };

            const studentUpdateByFilterStub = sinon.stub(Students, 'updateOne')
            .withArgs(updateFilter, updatePayload)
            .returns({
                exec: () => {
                    return Promise.resolve(updateResult);
                }
            });

            // Act
            await StudentService.updateStudent(studentId, updatePayload.name, updatePayload.age, updatePayload.email);

            // Assert
            assert.isTrue(studentFindByIdStub.calledOnce);
            assert.isTrue(studentUpdateByFilterStub.calledOnce);
        });
    });

    describe('#removeStudent', () => {
        it('should remove a student, if valid id is passed', async () => {
            // Arrange
            const studentId = new mongoose.Types.ObjectId().toString();

            const foundStudent = new Students({
                _id: new mongoose.Types.ObjectId(studentId),
                name: 'John Doe',
                age: 10,
                email: 'john.doe@fakeuniversity.com',
                courses: []
            });

            const studentFindByIdStub = sinon.stub(Students, 'findById')
            .withArgs(studentId)
            .returns({
                exec: () => {
                    return Promise.resolve(foundStudent);
                }
            });


            const deleteFilter = {
                _id: new mongoose.Types.ObjectId(studentId)
            };

            const deleteResult = {
                acknowledged: true,
                deletedCount: 1
            };

            const studentDeleteByFilterStub = sinon.stub(Students, 'deleteOne')
            .withArgs(deleteFilter)
            .returns({
                exec: () => {
                    return Promise.resolve(deleteResult);
                }
            });

            // Act
            await StudentService.removeStudent(studentId);

            // Assert
            assert.isTrue(studentFindByIdStub.calledOnce);
            assert.isTrue(studentDeleteByFilterStub.calledOnce);
        });
    });
});
