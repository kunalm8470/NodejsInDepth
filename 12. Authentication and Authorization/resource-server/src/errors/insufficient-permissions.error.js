class InsufficientPermissionsError extends Error {
    constructor(message) {
        super(message);

        this.name = 'InsufficientPermissionsError';
    }
}

module.exports = InsufficientPermissionsError;
