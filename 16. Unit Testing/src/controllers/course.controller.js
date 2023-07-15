const { CourseService } = require('../services');
const { StatusCodes } = require('http-status-codes'); 

class CourseController {
    constructor() {
        this.getAllCourses = this.getAllCourses.bind(this);
    }

    async getAllCourses(req, res, next) {
        try {
            const courses = await CourseService.getAllCourses();

            return res.status(StatusCodes.OK).json(courses);
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new CourseController();
