class DuplicateStudentEmailError extends Error {
    constructor(message) {
        super(message);

        this.name = 'DuplicateStudentEmailError';
    }
}

module.exports = DuplicateStudentEmailError;
