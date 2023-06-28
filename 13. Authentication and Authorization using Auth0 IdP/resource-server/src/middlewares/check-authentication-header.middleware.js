const { expressjwt } = require('express-jwt');
const { expressJwtSecret } = require('jwks-rsa');
const config = require('../config');

module.exports = expressjwt({
    // Defining where to load the public key from to verify the access token
    secret: expressJwtSecret({
        jwksUri: config.auth0.tenant.jwksUri,
        jwksRequestsPerMinute: config.auth0.tenant.jwksUriRateLimit,
        cache: true,
        rateLimit: true
    }),
    
    audience: config.auth0.api.audience,
    issuer: config.auth0.application.issuer,
    algorithms: ['RS256']
})
.unless({ path: config.whiteListedUrls }); // Bypass authentication for these routes
