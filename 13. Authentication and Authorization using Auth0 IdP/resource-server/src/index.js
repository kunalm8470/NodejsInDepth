const express = require('express');

const config = require('./config');

const { CheckAuthenticationHeaderMiddleware, RouteNotFoundErrorMiddleware, UnhandledErrorMiddleware } = require('./middlewares');

const app = express();

// Set body parser module
app.use(express.json());

// Authentication middleware
app.use(CheckAuthenticationHeaderMiddleware);

// Mount the routes
app.use(require('./routes'));

app.use(RouteNotFoundErrorMiddleware);
app.use(UnhandledErrorMiddleware);

app.listen(config.port, () => {
    console.log(`Client application is listening on port: ${config.port}`);
});
