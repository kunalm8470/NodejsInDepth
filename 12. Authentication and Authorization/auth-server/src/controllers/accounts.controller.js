const { StatusCodes } = require('http-status-codes');
const { AccountService } = require('../services');

class AccountsController {
    constructor() {
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
        this.regenerateAccessToken = this.regenerateAccessToken.bind(this);
        this.revokeRefreshToken = this.revokeRefreshToken.bind(this);
    }

    async signup(req, res, next) {
        try {
            const { firstName, lastName, dateOfBirth, gender, username, email, password } = req.body;

            await AccountService.signup(firstName, lastName, dateOfBirth, gender, username, email, password);

            res.status(StatusCodes.CREATED);

            return res.end();
        } catch (err) {
            return next(err);
        }
    }

    async login(req, res, next) {
        try {
            const { username, password } = req.body;

            const loginResponse = await AccountService.login(username, password);

            return res.status(StatusCodes.OK).json(loginResponse);
        } catch (err) {
            return next(err);
        }
    }

    async regenerateAccessToken(req, res, next) {
        try {
            const { token } = req.body;

            const regeneratedAccessTokenResponse = await AccountService.regenerateAccessToken(token);

            return res.status(StatusCodes.OK).json(regeneratedAccessTokenResponse);
        } catch (err) {
            return next(err);
        }
    }

    async revokeRefreshToken(req, res, next) {
        try {
            const { token } = req.body;

            await AccountService.revokeRefreshToken(token);

            res.status(StatusCodes.NO_CONTENT);

            return res.end();
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new AccountsController();
