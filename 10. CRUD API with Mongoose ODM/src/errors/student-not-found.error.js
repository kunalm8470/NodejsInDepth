class StudentNotFoundError extends Error {
    constructor(message) {
        super(message);

        this.name = 'StudentNotFoundError';
    }
}

module.exports = StudentNotFoundError;
