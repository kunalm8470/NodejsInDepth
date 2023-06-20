const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const mongoose = require('mongoose');

const ajvInstance = new Ajv({
    allErrors: true
});
addFormats(ajvInstance);

ajvInstance.addFormat('mongoObjectId', {
    type: 'string',
    validate: (data) => {
        try {
            const objectID = new mongoose.Types.ObjectId(data);
            const objectIDString = objectID.toString();
            return objectIDString === data;
        } catch (e) {
            return false;
        } 
    }
});

const schema = {
    $async: true,
    type: 'object',
    properties: {
        title: {
            type: 'string',
            minLength: 2,
            maxLength: 200
        },
        content: {
            type: 'string',
            minimum: 1
        },
        author: {
            type: 'string',
            format: 'mongoObjectId'
        }
    },
    required: [
        'title',
        'content',
        'author'
    ],
    additionalProperties: false
};

module.exports = ajvInstance.compile(schema);
