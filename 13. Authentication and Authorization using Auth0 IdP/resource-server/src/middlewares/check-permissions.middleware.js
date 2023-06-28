const { PermissionNotFoundError, InsufficientPermissionError } = require('../errors');

const CheckPermissionMiddleware = (expectedScopes) => {
    return (req, res, next) => {
        try {
            if (!req.auth || !req.auth.permissions || !req.auth.permissions.length) {
                return next(new PermissionNotFoundError('Permissions not present'));
            }

            const scopes = expectedScopes.split(' ');

            const actualScopes = req.auth.permissions;

            const areAllScopesPresent = scopes.every(scope => actualScopes.includes(scope));

            if (!areAllScopesPresent) {
                return next(new InsufficientPermissionError('Insufficient scopes'));
            }

            return next();
        } catch (err) {
            return next(err);
        }
    };
};

module.exports = CheckPermissionMiddleware;
