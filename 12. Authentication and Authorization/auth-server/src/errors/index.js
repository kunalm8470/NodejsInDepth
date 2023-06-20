const UserNotFoundError = require('./user-not-found.error');
const DuplicateUserEmailError = require('./duplicate-user-email.error');
const DuplicateUserUsernameError = require('./duplicate-user-username.error');
const PasswordNotMatchingError = require('./password-not-matching.error');
const RefreshTokenNotFoundError = require('./refreshtoken-notfound.error');
const RefreshTokenExpiredError = require('./refreshtoken-expired.error');
const RefreshTokenRevokedError = require('./refreshtoken-revoked.error');

module.exports = {
    UserNotFoundError,
    DuplicateUserEmailError,
    DuplicateUserUsernameError,
    PasswordNotMatchingError,
    RefreshTokenNotFoundError,
    RefreshTokenExpiredError,
    RefreshTokenRevokedError
};
