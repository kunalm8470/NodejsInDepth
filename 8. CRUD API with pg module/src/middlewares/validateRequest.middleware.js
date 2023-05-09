const { StatusCodes } = require('http-status-codes');

const validateRequestMiddleware = (ajvInstance) => {
    return async (req, res, next) => {
        try {
            await ajvInstance(req.body);

            return next();
        } catch (err) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(err.errors);
        }
    };
};

module.exports = validateRequestMiddleware;
