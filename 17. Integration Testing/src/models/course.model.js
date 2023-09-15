const mongoose = require('mongoose');

const { Schema } = mongoose;

const CoursesSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('courses', CoursesSchema, 'courses');
