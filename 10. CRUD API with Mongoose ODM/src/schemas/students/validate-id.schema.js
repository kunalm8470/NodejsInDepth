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
        id: {
            type: 'string',
            format: 'mongoObjectId'
        }  
    },
    required: [
        'id'
    ],
    additionalProperties: false
};

module.exports = ajvInstance.compile(schema);
