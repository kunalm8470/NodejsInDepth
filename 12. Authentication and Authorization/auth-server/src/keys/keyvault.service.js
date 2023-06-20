const { SecretClient } = require('@azure/keyvault-secrets');
const { ClientSecretCredential } = require('@azure/identity');

const { azureKeyVault } = require('../config');

const credential = new ClientSecretCredential(azureKeyVault.tenantId, azureKeyVault.clientId, azureKeyVault.clientSecret);

const client = new SecretClient(azureKeyVault.vaultUri, credential);

const getEcdsaPrivateKey = async () => {
    const secretName = 'token-ecdsa-privatekey';

    const secret = await client.getSecret(secretName);

    return secret.value;
};

const getEcdsaPublicKey = async () => {
    const secretName = 'token-ecdsa-publickey';

    const secret = await client.getSecret(secretName);

    return secret.value;
};

module.exports = {
    getEcdsaPrivateKey,
    getEcdsaPublicKey
};