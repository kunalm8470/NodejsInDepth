class AuthorizationHeaderNotFoundError extends Error {
    constructor(message) {
        super(message);

        this.name = 'AuthorizationHeaderNotFoundError';
    }
}

module.exports = AuthorizationHeaderNotFoundError;
