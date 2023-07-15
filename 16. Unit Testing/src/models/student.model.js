const mongoose = require('mongoose');

const { Schema } = mongoose;

const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    courses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'courses'
        }
    ]
});

// Add unique index on email field
StudentSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('students', StudentSchema, 'students');
