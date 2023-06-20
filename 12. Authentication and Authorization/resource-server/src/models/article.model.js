const mongoose = require('mongoose');

const { Schema } = mongoose;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('articles', ArticleSchema, 'articles');
