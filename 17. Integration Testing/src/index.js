const express = require('express');
const cors = require('cors');

const config = require('./config');
const { RouteNotFoundErrorMiddleware, UnhandledErrorMiddleware } = require('./middlewares');

const app = express();

// Initialize sequelize
require('./db');

app.use(express.json());
app.use(cors());

// Mount the routes
app.use(require('./routes'));

app.use(RouteNotFoundErrorMiddleware);
app.use(UnhandledErrorMiddleware);

app.listen(config.port, () => {
    console.log(`Server started listening on port: ${config.port}`)
});

module.exports.app = app;
