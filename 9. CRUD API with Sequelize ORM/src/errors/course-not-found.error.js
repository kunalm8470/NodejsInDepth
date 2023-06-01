class CourseNotFoundError extends Error {
    constructor(message) {
        super(message);
        
        this.name = 'CourseNotFoundError';
    }
}

module.exports = CourseNotFoundError;
