const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { randomUUID } = require('crypto');
const mongoose = require('mongoose');

const { Users, RefreshTokens, RevokedRefreshTokens } = require('../models');
const { UserNotFoundError, PasswordNotMatchingError, RefreshTokenRevokedError, RefreshTokenNotFoundError } = require('../errors');
const { getEcdsaPrivateKey } = require('../keys/keyvault.service');

class AccountsService {
    constructor() {
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
        this.regenerateAccessToken = this.regenerateAccessToken.bind(this);
        this.revokeRefreshToken = this.revokeRefreshToken.bind(this);
    }

    async signup(firstName, lastName, dateOfBirth, gender, username, email, password) {
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new Users({
            firstName,
            lastName,
            dateOfBirth,
            gender,
            username,
            email,
            passwordHash: hashedPassword
        });

        await newUser.save();
    }

    async login(username, password) {
        const filter = {
            username
        };

        const foundUser = await Users.findOne(filter).exec();

        if (foundUser === null) {
            throw new UserNotFoundError(`User with username: ${username} not found!`);
        }

        const doesPasswordMatch = await bcrypt.compare(password, foundUser.passwordHash);

        if (!doesPasswordMatch) {
            throw new PasswordNotMatchingError('Invalid credentials, please re-enter your credentials.');
        }

        const accessTokenClaims = {
            sub: foundUser._id.toString(),
            jti: randomUUID(),
            role: foundUser.role,
            username: foundUser.username 
        };

        const ecdsaPrivateKey = await getEcdsaPrivateKey();

        const accessToken = jwt.sign(accessTokenClaims, ecdsaPrivateKey, {
            algorithm: 'ES512',
            expiresIn: 15 * 60
        });

        const refreshTokenClaims = {
            sub: foundUser._id.toString(),
            jti: randomUUID()
        };

        const refreshToken = jwt.sign(refreshTokenClaims, ecdsaPrivateKey, {
            algorithm: 'ES512',
            expiresIn: '90 days'
        });

        // Persist the refresh token
        const foundRefreshToken = await RefreshTokens.findOne({
            userId: foundUser._id
        }).exec();

        if (foundRefreshToken === null) {
            const newRefreshToken = new RefreshTokens({
                userId: foundUser._id,
                token: refreshToken
            });

            await newRefreshToken.save();
        } else {
            const filter = {
                userId: foundUser._id
            };

            const payload = {
                token: refreshToken
            };

            await RefreshTokens.updateOne(filter, payload).exec();
        }

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_in: 15 * 60
        };
    }

    async regenerateAccessToken(refreshToken) {
        const { payload: refreshTokenClaims } = jwt.decode(refreshToken, { complete: true });

        const userId = new mongoose.Types.ObjectId(refreshTokenClaims.sub);

        /*
            * Check if refresh token is revoked or not
            * If revoked, return HTTP 401 Unauthorized.
        */
        const revokedRefreshedToken = await RevokedRefreshTokens.findOne({
            userId
        }).exec();

        if (revokedRefreshedToken) {
            throw new RefreshTokenRevokedError('Refresh token is already revoked!');
        }

        /* 
            * Check if refresh token is present or not
            * If not present, return HTTP 401 Unauthorized.
        */
        const foundRefreshToken = await RefreshTokens.findOne({
            userId
        }).exec();

        if (foundRefreshToken === null) {
            throw new RefreshTokenNotFoundError('Invalid refresh token');
        }

        /* 
            * Check if user is present or not
            * If not present, return HTTP 404 Not found.
        */
        const filter = {
            _id: userId
        };

        const foundUser = await Users.findOne(filter).exec();

        if (foundUser === null) {
            throw new UserNotFoundError(`User with username: ${username} not found!`);
        }

        const accessTokenClaims = {
            sub: foundUser._id.toString(),
            jti: randomUUID(),
            role: foundUser.role,
            username: foundUser.username 
        };

        const ecdsaPrivateKey = await getEcdsaPrivateKey();

        const accessToken = jwt.sign(accessTokenClaims, ecdsaPrivateKey, {
            algorithm: 'ES512',
            expiresIn: 15 * 60
        });

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_in: 15 * 60
        };
    }

    async revokeRefreshToken(refreshToken) {
        const { payload: refreshTokenClaims } = jwt.decode(refreshToken, { complete: true });

        const userId = new mongoose.Types.ObjectId(refreshTokenClaims.sub);

        // Persist the refresh token
        const foundRevokedRefreshToken = await RevokedRefreshTokens.findOne({
            userId
        }).exec();

        if (foundRevokedRefreshToken === null) {
            const newRefreshToken = new RevokedRefreshTokens({
                userId,
                token: refreshToken
            });

            await newRefreshToken.save();
        } else {
            foundRevokedRefreshToken.token = refreshToken;

            await foundRevokedRefreshToken.save();
        }
    }
}

module.exports = new AccountsService();
