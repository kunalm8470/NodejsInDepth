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
        }  
    },
    required: [
        'id'
    ],
    additionalProperties: false
};

module.exports = ajvInstance.compile(schema);
