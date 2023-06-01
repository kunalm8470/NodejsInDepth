const ValidateRequestBodyMiddleware = (ajvInstance) => {
    return async (req, res, next) => {
        try {
            await ajvInstance(req.body);

            return next();
        } catch (err) {
            return next(err);
        }
    };
};

module.exports = ValidateRequestBodyMiddleware;
