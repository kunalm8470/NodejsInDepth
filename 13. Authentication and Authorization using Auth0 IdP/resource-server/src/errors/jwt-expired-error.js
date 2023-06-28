class JwtExpiredError extends Error {
    constructor(message) {
        super(message);

        this.name = 'JwtExpiredError';
    }
}

module.exports = JwtExpiredError;
