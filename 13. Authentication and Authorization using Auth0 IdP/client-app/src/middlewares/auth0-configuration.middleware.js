const { auth } = require('express-openid-connect');
const dotenv = require('dotenv');
const path = require('path');

// Load all environment variables from .env file
dotenv.config({ path: path.join(__dirname, '..', '.env') });

module.exports = auth({
    authRequired: false, // Is authentication needed for all routes
    auth0Logout: true,

    issuerBaseURL: process.env.ISSUER_BASE_URL, 
    baseURL: process.env.BASE_URL, 
    clientID: process.env.CLIENT_ID,
    secret: process.env.SESSION_SECRET, 
    clientSecret: process.env.CLIENT_SECRET,
    idpLogout: true,

    // Define the grant flow
    authorizationParams: {
        response_type: 'code',
        audience: process.env.AUDIENCE,
        scope: 'openid profile email read:notes'
    }
});
