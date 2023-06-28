class InsufficientPermissionError extends Error {
    constructor(message) {
        super(message);

        this.name = 'InsufficientPermissionError';
    }
}

module.exports = InsufficientPermissionError;
