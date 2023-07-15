const mongoose = require('mongoose');
const { mongoDb } = require('../config');

(async () => {
    await mongoose.connect(mongoDb.connectionString, mongoDb.options);
})();
