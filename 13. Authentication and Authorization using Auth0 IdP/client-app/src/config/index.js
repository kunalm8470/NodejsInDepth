const dotenv = require('dotenv');
const path = require('path');

// Load all environment variables from .env file
dotenv.config({ path: path.join(__dirname, '..', '.env') });

module.exports = {
    environment: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || 3000, 10),

    resourceServer: {
        baseUrl: process.env.RESOURCE_API_BASEURL
    }
};
