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
        firstName: {
            type: 'string',
            minLength: 2,
            maxLength: 200
        },
        lastName: {
            type: 'string',
            minLength: 2,
            maxLength: 200
        },
        dateOfBirth: {
            type: 'string',
            format: 'date',
            formatMinimum: '2000-01-01',
            formatExclusiveMaximum: new Date().toISOString().split('T')[0]
        },
        gender: {
            type: 'string',
            enum: ['male', 'female', 'others']
        },
        username: {
            type: 'string',
            minLength: 2,
            maxLength: 50
        },
        email: {
            type: 'string',
            minLength: 5,
            maxLength: 256
        },
        password: {
            type: 'string'
        }
    },
    required: [
        'firstName',
        'lastName',
        'dateOfBirth',
        'gender',
        'username',
        'email',
        'password'
    ],
    additionalProperties: false
};

module.exports = ajvInstance.compile(schema);
