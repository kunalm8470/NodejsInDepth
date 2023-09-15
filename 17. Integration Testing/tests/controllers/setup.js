const mongoose = require('mongoose');
const { mongoDb } = require('../../src/config');

const connect = async () => {
    await mongoose.connect(mongoDb.connectionString, mongoDb.options);
};

const disconnect = async () => {
    await mongoose.disconnect();
};

const setupTestData = (model, fixture) => model.insertMany(fixture);

const teardownTestData = (model, fixture) => model.deleteMany({});

module.exports = {
    connect,
    disconnect,
    setupTestData,
    teardownTestData
};
