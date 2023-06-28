const { ReasonPhrases, StatusCodes } = require('http-status-codes');

const { NotesNotFoundError, RouteNotFoundError } = require('../errors');

const UnhandledErrorMiddleware = (err, req, res, next) => {
    let reasonPhrase = ReasonPhrases.INTERNAL_SERVER_ERROR;
    let errorMessage = err.message;
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

    if (err instanceof RouteNotFoundError) {
        reasonPhrase = ReasonPhrases.NOT_FOUND;
        statusCode = StatusCodes.NOT_FOUND;
        errorMessage = err.message;
    }

    else if (err instanceof NotesNotFoundError) {
        reasonPhrase = ReasonPhrases.NOT_FOUND;
        statusCode = StatusCodes.NOT_FOUND;
        errorMessage = err.message;
    }

    res.status(statusCode);

    res.render('error', {
        title: 'Error page',
        status: reasonPhrase,
        message: errorMessage
    });
};

module.exports = UnhandledErrorMiddleware;
