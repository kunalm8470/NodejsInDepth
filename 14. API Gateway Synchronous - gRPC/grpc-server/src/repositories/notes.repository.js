const { Chance } = require('chance');
const { randomUUID } = require('crypto');

const chance = new Chance();

const randomNotes = Array.from({ length: 100}, () => {
    return {
        id: randomUUID(),
        title: chance.sentence({
            words: 10
        }),
        content: chance.sentence({
            words: 100
        })
    };
});

const getNotes = () => {
    return randomNotes;
};

module.exports = {
    getNotes
};
