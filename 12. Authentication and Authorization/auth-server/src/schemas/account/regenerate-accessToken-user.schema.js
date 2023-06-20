const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajvInstance = new Ajv({
    allErrors: true
});
addFormats(ajvInstance);

ajvInstance.addFormat('mongoObjectId', {
    type: 'string',
    validate: (data) => {
        try {
            const objectId = new mongoose.Types.ObjectId(data);
            const objectIdString = objectId.toString();
            return objectIdString === data;
        } catch (e) {
            return false;
        } 
    }
});

const schema = {
    $async: true,
    type: 'object',
    properties: {
        userId: {
            type: 'string',
            format: 'mongoObjectId'
        },
        refresh_token: {
            type: 'string'
        },
        grant_type: {
            type: 'string',
            enum: ['refresh_token']
        }
    },
    required: [
        'userId',
        'refresh_token',
        'grant_type'
    ],
    additionalProperties: false
};

module.exports = ajvInstance.compile(schema);
