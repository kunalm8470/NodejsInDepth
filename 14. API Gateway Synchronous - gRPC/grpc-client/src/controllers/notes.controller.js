const grpc = require('@grpc/grpc-js');
const { StatusCodes } = require('http-status-codes');
const { NotesService } = require('../services');

class NotesController {
    constructor() {
        this.getNotesPaginated = this.getNotesPaginated.bind(this);
        this.getNoteById = this.getNoteById.bind(this);
    }

    async getNotesPaginated(req, res, next) {
        try {
            const page = parseInt(req.query.page || 1, 10);

            const limit = parseInt(req.query.limit || 5, 10);

            const notes = await NotesService.getNotesPaginated(page, limit);

            return res.status(StatusCodes.OK).json(notes);
        } catch (err) {
            return next(err);
        }
    }

    async getNoteById(req, res, next) {
        try {
            const { id } = req.params;

            const note = await NotesService.getNoteById(id);

            return res.status(StatusCodes.OK).json(note);
        } catch (err) {
            if (err.code === grpc.status.NOT_FOUND) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: err.message
                });
            }

            return next(err);
        }
    }
}

module.exports = new NotesController();
