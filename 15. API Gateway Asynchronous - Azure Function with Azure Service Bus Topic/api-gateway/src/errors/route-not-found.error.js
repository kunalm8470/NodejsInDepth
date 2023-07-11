class RouteNotFoundError extends Error {
    constructor(message) {
        super(message);

        this.name = 'RouteNotFoundError';
    }
}

module.exports = RouteNotFoundError;
