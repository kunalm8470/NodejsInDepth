const { randomUUID } = require('crypto');
const { ServiceBusClient } = require('@azure/service-bus');

const { azureServiceBus: { sendConnectionString, topicName } } = require('../config');

class JobsService {
    constructor() {
        this.sendEmail = this.sendEmail.bind(this);

        this.serviceBusClient = new ServiceBusClient(sendConnectionString);
    }

    async sendEmail(messagePayload) {
        const serviceBusMessage = {
            messageId: randomUUID(),
            body: messagePayload
        };

        const azureServiceBusTopicSender = this.serviceBusClient.createSender(topicName);

        await azureServiceBusTopicSender.sendMessages(serviceBusMessage);
    }
}

module.exports = new JobsService();
