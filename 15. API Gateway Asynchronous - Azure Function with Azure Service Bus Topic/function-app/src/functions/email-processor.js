const { app } = require('@azure/functions');

app.serviceBusTopic('email-processor', {
    connection: 'nodejskt001_SERVICEBUS',
    topicName: 'job-processor-topic',
    subscriptionName: 'send-email-subscription',
    handler: (message, context) => {
        context.log('Service bus topic function processed message:', message);
    }
});
