const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class StudentCourse extends Model {
        static associate(models){
            // Define association here
        }
    };

    StudentCourse.init({
        studentId: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            references: {
                model: 'students',
                key: 'id'
            },
            name: 'fk_studentcourses_studentId'
        },
        courseId: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            references: {
                model: 'courses',
                key: 'id'
            },
            name: 'fk_studentcourses_courseId'
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
        tableName: 'studentcourses',
        freezeTableName: true,
        sequelize
    });

    return StudentCourse;
};