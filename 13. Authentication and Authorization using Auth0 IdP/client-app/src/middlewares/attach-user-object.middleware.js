const AttachUserMiddleware = (req, res, next) => {
    res.locals.user = req.oidc.user;

    return next();
};

module.exports = AttachUserMiddleware;
