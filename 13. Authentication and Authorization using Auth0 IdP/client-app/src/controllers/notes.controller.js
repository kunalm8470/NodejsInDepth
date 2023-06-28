const { NotesService } = require('../services');

class NotesController {
    constructor() {
        this.renderNotes = this.renderNotes.bind(this);
    }

    async renderNotes(req, res, next) {
        try {
            // Attach access token to user object
            let { access_token } = req.oidc.accessToken;

            const notes = await NotesService.fetchNotes(access_token);

            res.render('notes', {
                notes
            });
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new NotesController();
