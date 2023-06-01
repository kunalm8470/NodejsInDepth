'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    const courses = [
      {
        id: uuidv4(),
        name: 'Mathematics',
        createdAt: Sequelize.literal(`timestamp '2000-01-01' + random() * (now() - '2000-01-01')`),
        updatedAt: null
      },
      {
        id: uuidv4(),
        name: 'Science',
        createdAt: Sequelize.literal(`timestamp '2000-01-01' + random() * (now() - '2000-01-01')`),
        updatedAt: null
      },
      {
        id: uuidv4(),
        name: 'Computers',
        createdAt: Sequelize.literal(`timestamp '2000-01-01' + random() * (now() - '2000-01-01')`),
        updatedAt: null
      }
    ];

    // Do bulk insert
    await queryInterface.bulkInsert('courses', courses);
  },

  async down (queryInterface, Sequelize) {
    // Do bulk delete
    await queryInterface.bulkDelete('courses', null, {});
  }
};
