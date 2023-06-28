class PermissionNotFoundError extends Error {
    constructor(message) {
        super(message);

        this.name = 'PermissionNotFoundError';
    }
}

module.exports = PermissionNotFoundError;
