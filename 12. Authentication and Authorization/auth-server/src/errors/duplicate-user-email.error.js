class DuplicateUserEmailError extends Error {
    constructor(message) {
        super(message);

        this.name = 'DuplicateUserEmailError';
    }
}

module.exports = DuplicateUserEmailError;
