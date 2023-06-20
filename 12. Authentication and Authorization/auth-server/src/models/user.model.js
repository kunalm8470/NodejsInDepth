const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'others']
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'editor', 'reader'],
        default: 'reader'
    }
});

// Add unique index on username field
UserSchema.index({ username: 1 }, { unique: true });

// Add unique index on email field
UserSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('users', UserSchema, 'users');
