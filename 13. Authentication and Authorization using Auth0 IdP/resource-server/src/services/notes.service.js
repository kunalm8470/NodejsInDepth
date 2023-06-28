const { randomUUID } = require('crypto');
const Chance = require('chance');

class NotesService {
    constructor() {
        this.getAllNotes = this.getAllNotes.bind(this);
        this.chance = new Chance();

        this.notes = [];

        // Generate random notes in-memory
        for (let i = 0; i < 100; i++) {
            this.notes.push({
                id: randomUUID(),
                userId: randomUUID(),
                title: this.chance.sentence({ words: 10 }),
                content: this.chance.paragraph({ sentences: 30 })
            });
        }
    }

    getAllNotes() {
        return this.notes;
    }
}

module.exports = new NotesService();
