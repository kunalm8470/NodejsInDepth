'use strict';

const { DataTypes } = require('sequelize');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('students', {
      id: {
        allowNull: false, // NOT NULL constraint
        primaryKey: true, // Primary key
        type: DataTypes.UUID, // Type
        defaultValue: DataTypes.UUIDV4,
        name: 'pk_students_id' // Constraint name
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(200) // CHARACTER VARYING (200)
      },
      age: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(256), // CHARACTER VARYING (256)
        unique: true // Add unique index on email column
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

    // Add an index to the email column
    await queryInterface.addIndex('students', ['email'], {
      name: 'idx_students_email'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('students');
  }
};
