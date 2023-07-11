const dotenv = require('dotenv');
const path = require('path');

const envFilePath = path.join(__dirname, '..', '.env');

dotenv.config({ path: envFilePath });

module.exports = {
    azureServiceBus: {
        sendConnectionString: process.env.AZURESERVICEBUS_SEND_CONNECTIONSTRING,
        topicName: process.env.AZURESERVICEBUS_TOPIC_NAME
    }
};
