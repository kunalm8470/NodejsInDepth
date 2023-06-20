const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajvInstance = new Ajv({
    allErrors: true
});
addFormats(ajvInstance);

const schema = {
    $async: true,
    type: 'object',
    properties: {
        refresh_token: {
            type: 'string'
        }
    },
    required: [
        'refresh_token'
    ],
    additionalProperties: false
};

module.exports = ajvInstance.compile(schema);
