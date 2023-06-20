class RefreshTokenRevokedError extends Error {
    constructor(message) {
        super(message);

        this.name = 'RefreshTokenRevokedError';
    }
}

module.exports = RefreshTokenRevokedError;
