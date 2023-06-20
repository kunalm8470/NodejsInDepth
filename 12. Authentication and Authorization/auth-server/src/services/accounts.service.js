const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { randomUUID } = require('crypto');
const mongoose = require('mongoose');

const { Users, RefreshToken, RefreshTokens } = require('../models');
const { UserNotFoundError, PasswordNotMatchingError } = require('../errors');
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

    async regenerateAccessToken(userId, refreshToken) {

    }

    async revokeRefreshToken(refreshToken) {

    }
}

module.exports = new AccountsService();
