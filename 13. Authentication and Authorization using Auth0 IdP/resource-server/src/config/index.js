const dotenv = require('dotenv');
const path = require('path');

// Load all environment variables from .env file
dotenv.config({ path: path.join(__dirname, '..', '.env') });

module.exports = {
    environment: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || 3000, 10),

    whiteListedUrls: process.env.WHITELISTED_URLS.split(','),

    auth0: {
        tenant: {
            jwksUri: process.env.AUTHO_TENANT_JWKSURI,
            jwksUriRateLimit: parseInt(process.env.AUTH0_TENANT_JWKSURI_RATELIMIT_PERMINUTE || 100, 10)
        },

        application: {
            issuer: process.env.AUTH0_APPLICATION_ISSUER
        },

        api: {
            audience: process.env.AUTH0_API_AUDIENCE,
            accessTokenSigningAlgorithm: process.env.AUTH0_API_ACCESSTOKEN_SIGNINGALGORITHM
        }
    }
};
