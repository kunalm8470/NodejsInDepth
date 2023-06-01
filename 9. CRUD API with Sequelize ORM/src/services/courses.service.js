const { Course } = require('../models');

class CourseService {
    constructor() {
        this.getAllCourses = this.getAllCourses.bind(this);
    }

    async getAllCourses() {
        return await Course.findAll({
            attributes: [
                'id',
                ['name', 'course'] // Aliasing
            ]
        });
    }
}

module.exports = new CourseService();
