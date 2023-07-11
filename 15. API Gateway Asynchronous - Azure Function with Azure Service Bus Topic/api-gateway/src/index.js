const express = require('express');
const { UnhandledErrorMiddleware, RouteNotFoundErrorMiddleware } = require('./middlewares');

const app = express();

app.use(require('./routes'));

app.use(RouteNotFoundErrorMiddleware);

app.use(UnhandledErrorMiddleware);

const port = 3000;

app.listen(port);
