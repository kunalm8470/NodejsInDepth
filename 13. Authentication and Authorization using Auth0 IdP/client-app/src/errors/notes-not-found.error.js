class NotesNotFoundError extends Error {
    constructor(message) {
        super(message);

        this.name = 'NotesNotFoundError';
    }
}

module.exports = NotesNotFoundError;
