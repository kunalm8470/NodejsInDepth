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
        id: {
            type: 'string',
            format: 'uuid'
        },
        title: {
            type: 'string',
            minLength: 2,
            maxLength: 200
        },
        description: {
            type: 'string',
            minLength: 2,
            maxLength: 500
        },
        completed: {
            type: 'boolean'
        }
    },
    required: [
        'id',
        'title',
        'description',
        'completed'
    ]
};

module.exports = ajvInstance.compile(schema);
