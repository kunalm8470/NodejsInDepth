const { assert } = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');

const { Courses } = require('../../../src/models');
const { CourseService } = require('../../../src/services');

/*
    // Hook which will run after each individual test (it)
    beforeEach(() => {

    });

    afterEach(() => {

    });
*/

/*
    // Below hook will run after each describe
    before(() => {

    });

    after(() => {
        
    });
*/

afterEach(() => {
    // Clear the mocks after each test
    sinon.restore();
});

describe('CourseService', () => {
	describe('#getAllCourses', () => {
		
		it('should return list of courses, when validation error occured', async () => {
			// Arrange
			const stubCourses = [
                {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Mathematics'
                },
                {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Physics'
                },
                {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Chemistry'
                }
            ];

            const findFilter = {};

            const studentFindStub = sinon.stub(Courses, 'find')
            .withArgs(findFilter)
            .returns({
                exec: () => {
                    return Promise.resolve(stubCourses);
                }
            });

			// Act
            const courses = await CourseService.getAllCourses();
			
			// Assert
            assert.isNotNull(courses);
            assert.isTrue(studentFindStub.calledOnce);
		});
	});
});
