const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Student extends Model {
    static associate(models) {
      this.belongsToMany(models.Course, 
        { 
          through: 'studentcourses',
          as: 'courses',
          foreignKey: 'studentId'
        });
    }
  };

  Student.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      name: 'pk_students_id'
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(200)
    },
    age: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(256),
      unique: true
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
    tableName: 'students',
    freezeTableName: true,
    sequelize
  });

  return Student;
};
