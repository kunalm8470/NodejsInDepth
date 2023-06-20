class DuplicateUserUsernameError extends Error {
    constructor(message) {
        super(message);

        this.name = 'DuplicateUserUsernameError';
    }
}

module.exports = DuplicateUserUsernameError;
