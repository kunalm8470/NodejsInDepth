const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {

  class Course extends Model {
    static associate(models) {
      this.belongsToMany(models.Student, {
        through: 'studentcourses',
        as: 'students',
        foreignKey: 'courseId'
      });
    }
  };

  Course.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      name: 'pk_courses_id'
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(500)
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    timestamps: false,
    schema: 'public',
    tableName: 'courses',
    freezeTableName: true,
    sequelize
  });

  return Course;
};
