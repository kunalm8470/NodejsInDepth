class RefreshTokenNotFoundError extends Error {
    constructor(message) {
        super(message);

        this.name = 'RefreshTokenNotFoundError';
    }
}

module.exports = RefreshTokenNotFoundError;
