const jwt = require('jsonwebtoken');

const KeyVaultService = require('../keys/keyvault.service');
const { AuthorizationHeaderNotFoundError } = require('../errors');

const AuthenticateJWTMiddleware = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
  
        const token = authorizationHeader?.split(' ')[1];
    
        if (!token) {
            return next(new AuthorizationHeaderNotFoundError('No authorization header present!'));
        }

        const publicKey = await KeyVaultService.getEcdsaPublicKey();

        const { payload: claims } = jwt.verify(token, publicKey, {
            complete: true
        });

        req.user = claims;

        return next();
    } catch (err) {
        return next(err);
    }
};

module.exports = AuthenticateJWTMiddleware;
