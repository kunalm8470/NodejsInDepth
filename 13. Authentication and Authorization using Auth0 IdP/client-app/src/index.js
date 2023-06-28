const express = require('express');
const path = require('path');

const config = require('./config');
const { Auth0ConfigurationMiddleware, AttachUserMiddleware, RouteNotFoundErrorMiddleware, UnhandledErrorMiddleware } = require('./middlewares');

const app = express();

// Set the views folder
app.set('views', path.join(__dirname, 'views'));

// Expose the public directory contents publicly
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set body parser module
app.use(express.json());

app.use(Auth0ConfigurationMiddleware);

app.use(AttachUserMiddleware);

// Mount the routes
app.use(require('./routes'));

app.use(RouteNotFoundErrorMiddleware);
app.use(UnhandledErrorMiddleware);

app.listen(config.port, () => {
    console.log(`Client application is listening on port: ${config.port}`);
});
