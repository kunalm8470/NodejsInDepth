class RefreshTokenExpiredError extends Error {
    constructor(message) {
        super(message);

        this.name = 'RefreshTokenExpiredError';
    }
}

module.exports = RefreshTokenExpiredError;
