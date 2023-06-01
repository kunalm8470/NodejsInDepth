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
        name: {
            type: 'string',
            minLength: 2,
            maxLength: 200
        },
        age: {
            type: 'integer',
            minimum: 0,
            maximum: 100
        },
        email: {
            type: 'string'
        }
    },
    required: [
        'name',
        'age',
        'email'
    ],
    additionalProperties: false
};

module.exports = ajvInstance.compile(schema);
