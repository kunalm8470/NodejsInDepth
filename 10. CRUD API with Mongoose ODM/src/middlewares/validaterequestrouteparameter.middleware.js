const ValidateRequestRouteParameterMiddleware = (ajvInstance) => {
    return async (req, res, next) => {
        try {
            await ajvInstance(req.params);

            return next();
        } catch (err) {
            return next(err);
        }
    };
};

module.exports = ValidateRequestRouteParameterMiddleware;
