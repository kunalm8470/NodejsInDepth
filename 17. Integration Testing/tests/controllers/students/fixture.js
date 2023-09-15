const { Chance } = require('chance');
const mongoose = require('mongoose');

const chance = new Chance();

const students = Array.from({ length: 100 }, () => {
    return {
      _id: new mongoose.Types.ObjectId(),
      name: chance.name({
        full: true
      }),
      email: chance.email(),
      age: chance.integer({
        min: 10,
        max: 17
      })
    };
});

module.exports = students;
