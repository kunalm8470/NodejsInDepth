const ArticleNotFoundError = require('./article-not-found.error');
const AuthorizationHeaderNotFoundError = require('./authorizationHeader-not-found.error');
const InsufficientPermissionsError = require('./insufficient-permissions.error');

module.exports = {
    ArticleNotFoundError,
    AuthorizationHeaderNotFoundError,
    InsufficientPermissionsError
};
