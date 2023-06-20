const SignupUserSchema = require('./account/signup-user.schema');
const LoginUserSchema = require('./account/login-user.schema');
const RegenerateAccessTokenSchema = require('./account/regenerate-accessToken-user.schema');
const RevokeRefreshTokenSchema = require('./account/revoke-refreshToken-user.schema');

module.exports = {
    SignupUserSchema,
    LoginUserSchema,
    RegenerateAccessTokenSchema,
    RevokeRefreshTokenSchema
};
