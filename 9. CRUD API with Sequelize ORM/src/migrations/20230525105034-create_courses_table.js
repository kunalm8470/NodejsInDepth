const { DataTypes } = require('sequelize');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courses', {
      id: {
        allowNull: false, // NOT NULL constraint
        primaryKey: true, // Primary key
        type: DataTypes.UUID, // Type
        defaultValue: DataTypes.UUIDV4,
        name: 'pk_courses_id' // Constraint name
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(200) // CHARACTER VARYING (200)
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('courses');
  }
};
