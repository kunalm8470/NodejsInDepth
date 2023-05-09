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
        title: {
            type: 'string',
            minLength: 2,
            maxLength: 200
        },
        description: {
            type: 'string',
            minLength: 2,
            maxLength: 500
        }
    },
    required: [
        'title',
        'description'
    ]
};

module.exports = ajvInstance.compile(schema);
