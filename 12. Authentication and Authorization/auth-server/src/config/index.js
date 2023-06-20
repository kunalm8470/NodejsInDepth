const dotenv = require('dotenv');
const path = require('path');

// Load all environment variables from .env file
dotenv.config({ path: path.join(__dirname, '..', '.env') });

module.exports = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,

  azureKeyVault: {
    vaultUri: process.env.AZUREKEYVAULT_VAULT_URI,
    tenantId: process.env.AZUREKEYVAULT_TENANT_ID,
    clientId: process.env.AZUREKEYVAULT_CLIENT_ID,
    clientSecret: process.env.AZUREKEYVAULT_CLIENT_SECRET
  },

  mongoDb: {
    connectionString: process.env.DB_CONNECTIONSTRING,
    options: {
      useNewUrlParser: process.env.DB_USENEWURLPARSER === 'true',
      useUnifiedTopology: process.env.DB_USEUNIFIEDTOPOLOGY === 'true',
      minPoolSize: Number(process.env.DB_MINIMUMPOOLSIZE || 5),
      maxPoolSize: Number(process.env.DB_MAXIMUMPOOLSIZE || 30),
      serverSelectionTimeoutMS: process.env.DB_SERVERSELECTIONTIMEOUTMILLISECONDS, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: process.env.DB_SOCKETTIMEOUTMILLISECONDS, // Close sockets after 45 seconds of inactivity
    }
  }
};
