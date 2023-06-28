const { StatusCodes } = require('http-status-codes');

const { NotesService } = require('../services');

class NotesController {
    constructor() {
        this.getAll = this.getAll.bind(this);
    }

    getAll(req, res, next) {
        try {
            const notes = NotesService.getAllNotes();

            return res.status(StatusCodes.OK).json(notes);
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new NotesController();
