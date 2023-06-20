const mongoose = require('mongoose');

const { Schema } = mongoose;

const RevokedRefreshTokenSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    },
    token: {
        type: 'string',
        required: true
    }
});

RevokedRefreshTokenSchema.index({ userId: 1 }, { unique: true });

module.exports = mongoose.model('revokedRefreshTokens', RevokedRefreshTokenSchema, 'revokedRefreshTokens');
