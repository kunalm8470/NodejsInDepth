class PasswordNotMatchingError extends Error {
    constructor(message) {
        super(message);

        this.name = 'PasswordNotMatchingError';
    }
}

module.exports = PasswordNotMatchingError;
