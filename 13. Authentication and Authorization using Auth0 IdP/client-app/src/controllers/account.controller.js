class AccountController {
    constructor() {
        this.renderHomePage = this.renderHomePage.bind(this);
        this.renderSignupPage = this.renderSignupPage.bind(this);
        this.renderProfilePage = this.renderProfilePage.bind(this);
    }

    renderHomePage(req, res, next) {
        try {
            res.render('index', {
                title: 'Auth0 Client application',
                isAuthenticated: req.oidc.isAuthenticated()
            });
        } catch (err) {
            return next(err);
        }
    }

    renderSignupPage(req, res, next) {
        try {
            res.oidc.login({
                returnTo: '/',
                authorizationParams: {
                  screen_hint: 'signup'
                }
            });
        } catch (err) {
            return next(err);
        }
    }

    renderProfilePage(req, res, next) {
        try {
            res.render('profile', {
                title: 'Profile page'
            });
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new AccountController();
