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
        studentId: {
            type: 'string',
            format: 'uuid'
        },
        courseId: {
            type: 'string',
            format: 'uuid'
        }
    },
    required: [
        'studentId',
        'courseId'
    ],
    additionalProperties: false
};

module.exports = ajvInstance.compile(schema);
