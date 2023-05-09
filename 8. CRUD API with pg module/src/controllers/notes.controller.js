const NotesService = require('../services/notes.service');
const { StatusCodes } = require('http-status-codes');

class NotesController {

    constructor() {
        this.getById = this.getById.bind(this);
        this.keysetPaginate = this.keysetPaginate.bind(this);
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async getById(req, res, next) {
        const { id } = req.params;

        const note = await NotesService.getById(id);

        if (note && note.deletedAt) {
            res.status(StatusCodes.NOT_FOUND);

            return res.end();
        }

        return res.status(StatusCodes.OK).json(note);
    }

    async keysetPaginate(req, res, next) {
        let { limit, searchAfter } = req.query;

        limit = parseInt(limit, 10);

        let searchAfterId, searchAfterDate;
        if (searchAfter) {
            [searchAfterId, searchAfterDate] = searchAfter.split('_');
        }

        const notes = await NotesService.keysetPaginate(limit, searchAfterId, searchAfterDate);

        let nextSearchAfter = null;

        if (notes.length) {
            const { id, createdAt } = notes.at(-1);

            nextSearchAfter = `${id}_${createdAt.toISOString()}`;
        }

        const paginationResponse = {
            searchAfter: nextSearchAfter,
            data: notes
        };

        return res.status(StatusCodes.OK).json(paginationResponse);
    }

    async add(req, res, next) {
        const { title, description } = req.body;

        const createdNote = await NotesService.add(title, description);

        return res.status(StatusCodes.CREATED).json(createdNote);
    }

    async update(req, res, next) {
        const { id, title, description, completed } = req.body;

        const updatedNote = await NotesService.update(id, title, description, completed);

        return res.status(StatusCodes.OK).json(updatedNote);
    }

    async delete(req, res, next) {
        const { id } = req.params;

        await NotesService.delete(id);

        res.status(204);

        return res.end();
    }
}

module.exports = new NotesController();
