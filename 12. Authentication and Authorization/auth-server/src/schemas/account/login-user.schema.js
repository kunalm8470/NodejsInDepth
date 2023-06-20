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
        username: {
            type: 'string',
            minLength: 2,
            maxLength: 50
        },
        password: {
            type: 'string'
        },
        grant_type: {
            type: 'string',
            enum: ['password']
        }
    },
    required: [
        'username',
        'password',
        'grant_type'
    ],
    additionalProperties: false
};

module.exports = ajvInstance.compile(schema);
