'use strict';

const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const students = [];

    // Generate 100 student in memory
    for (let i = 0; i < 100; i++) {
      const gender = faker.person.sexType();
      const firstName = faker.person.firstName(gender);
      const lastName = faker.person.lastName();
      const fullName = `${firstName} ${lastName}`;

      const email = `${firstName}.${lastName}@fakeuniversity.com`;

      students.push({
        id: uuidv4(),
        name: fullName,
        age: Math.floor(Math.random() * (20 - 15) + 15),
        email: email,
        createdAt: Sequelize.literal(`timestamp '2000-01-01' + random() * (now() - '2000-01-01')`),
        updatedAt: null
      });
    }


    // Do bulk insert
    await queryInterface.bulkInsert('students', students);
  },

  async down (queryInterface, Sequelize) {
      // Do bulk delete
      await queryInterface.bulkDelete('students', null, {});
  }
};
