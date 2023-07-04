const grpc = require('@grpc/grpc-js');

const { NotesRepository } = require('../repositories');

const getNotesPaginated = (call, callback) => {
    const page = (call.request.page || 1);

    const limit = (call.request.limit || 5);

    const notes = NotesRepository.getNotes();

    const skip = (page - 1) * limit;

    const filteredNotes = notes.slice(skip, skip + limit);

    callback(null, {
        notes: filteredNotes
    });
};

const getNotesById = (call, callback) => {
    const { id } = call.request;

    const notes = NotesRepository.getNotes();

    const foundNote = notes.find((note) => note.id === id);

    if (!foundNote) {
        callback({
            message: `Note not found with id: ${id}`,
            code: grpc.status.NOT_FOUND
        });
    }

    callback(null, foundNote);
};

module.exports = {
    getNotesById,
    getNotesPaginated
};
