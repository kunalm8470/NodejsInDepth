const request = require('supertest');
const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');

const Student = require('../../../src/models/student.model');
const { connect, disconnect, setupTestData, teardownTestData } = require('../setup');
const fixture = require('./fixture'); // Fake data
const { app } = require('../../../src/index');

before(async () => {
    // Connect to test database
    await connect();
});

after(async () => {
    // Disconnecting from test database
    await disconnect();
});

describe('StudentsController', () => {

    beforeEach('Setup test data', async () => {
        await setupTestData(Student, fixture);
    });

    afterEach('Teardown test data', async () => {
        await teardownTestData(Student, fixture);
    });

    describe('GET /api/Students', () => {
        let page;
        let limit;

        const url = '/api/Students';

        it('should paginate with implicit page and limit, if page and limit are not passed', (done) => {

            request(app)
            .get(url)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(StatusCodes.OK)
            .then((response) => {
                expect(response.body).to.be.an('array');

                expect(response.body).to.have.lengthOf(10);

                expect(response.body[0]).to.have.all.keys([
                    '_id',
                    'name',
                    'email',
                    'age',
                    'courses',
                    '__v'
                ]);

                done();
            })
            .catch((err) => done(err));
        });

        it('should paginate with explicit page and limit, if page and limit are passed', (done) => {
            page = 1;
            limit = 4;

            request(app)
            .get(`${url}?page=${page}&limit=${limit}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(StatusCodes.OK)
            .then((response) => {
                expect(response.body).to.be.an('array');

                expect(response.body).to.have.lengthOf(limit);

                expect(response.body[0]).to.have.all.keys([
                    '_id',
                    'name',
                    'email',
                    'age',
                    'courses',
                    '__v'
                ]);

                done();
            })
            .catch((err) => done(err));
        });
    });
});