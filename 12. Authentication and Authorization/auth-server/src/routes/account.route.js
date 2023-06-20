const express = require('express');
const router = express.Router();

const { AccountsController } = require('../controllers');
const { ValidateRequestBodyMiddleware } = require('../middlewares');

const { SignupUserSchema, LoginUserSchema, RegenerateAccessTokenSchema, RevokeRefreshTokenSchema } = require('../schemas');

router.post('/signup', ValidateRequestBodyMiddleware(SignupUserSchema), AccountsController.signup);
router.post('/login', ValidateRequestBodyMiddleware(LoginUserSchema), AccountsController.login);
router.post('/token', ValidateRequestBodyMiddleware(RegenerateAccessTokenSchema), AccountsController.regenerateAccessToken);
router.post('/revoke', ValidateRequestBodyMiddleware(RevokeRefreshTokenSchema), AccountsController.revokeRefreshToken);

module.exports = router;
