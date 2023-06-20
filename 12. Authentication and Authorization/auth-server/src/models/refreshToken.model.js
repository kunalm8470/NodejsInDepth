const mongoose = require('mongoose');

const { Schema } = mongoose;

const RefreshTokenSchema = new Schema({
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

RefreshTokenSchema.index({ userId: 1 }, { unique: true });

module.exports = mongoose.model('refreshTokens', RefreshTokenSchema, 'refreshTokens');
