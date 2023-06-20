const UserModel = require('./user.model');
const RefreshTokenModel = require('./refreshToken.model');
const RevokedRefreshTokenModel = require('./revokedRefreshToken.model');

module.exports = {
    Users: UserModel,
    RefreshTokens: RefreshTokenModel,
    RevokedRefreshTokens: RevokedRefreshTokenModel
};
