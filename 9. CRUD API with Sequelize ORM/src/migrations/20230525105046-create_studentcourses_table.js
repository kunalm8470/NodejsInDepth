const { DataTypes } = require('sequelize');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('studentcourses', {
      studentId: {
        allowNull: false, // NOT NULL constraint
        primaryKey: true, // Primary key
        type: DataTypes.UUID, // Type
        references: {
          model: 'students',
          key: 'id'
        },
        name: 'fk_studentcourses_studentId'
      },
      courseId: {
        allowNull: false, // NOT NULL constraint
        primaryKey: true, // Primary key
        type: DataTypes.UUID, // Type
        references: {
          model: 'courses',
          key: 'id'
        },
        name: 'fk_studentcourses_coursesId'
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('studentcourses');
  }
};
