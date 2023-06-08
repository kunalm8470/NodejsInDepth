const { Courses } = require('../models');

class CourseService {
    constructor() {
        this.getAllCourses = this.getAllCourses.bind(this);
    }

    async getAllCourses() {
        const filter = {};

        return await Courses.find(filter).exec();
    }
}

module.exports = new CourseService();
