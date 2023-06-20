const mongoose = require('mongoose');
const { Article } = require('../models');
const { ArticleNotFoundError } = require('../errors');

class ArticlesService {
    constructor() {
        this.getArticleById = this.getArticleById.bind(this);
        this.getArticlesOffsetPaginated = this.getArticlesOffsetPaginated.bind(this);
        this.addArticle = this.addArticle.bind(this);
        this.updateArticle = this.updateArticle.bind(this);
        this.removeArticle = this.removeArticle.bind(this);
    }

    async getArticleById(id) {
        const foundArticle = await Article.findById(id).exec();

        if (!foundArticle) {
            throw new ArticleNotFoundError(`Article not found with id: ${id}`);
        }

        return foundArticle;
    }

    async getArticlesOffsetPaginated(page, limit) {
        const skip = (page - 1) * limit;

        // Empty object filter, which means select all
        const filter = {};

        const articles = await Article
        .find(filter)
        .skip(skip)
        .limit(limit)
        .exec();

        return articles;
    }

    async addArticle(title, content, author) {
        const newArticle = new Article({
            title,
            content,
            author
        });

        // .save method should be called on instance of the model
        await newArticle.save();

        return newArticle;
    }

    async updateArticle(id, title, content) {
        const findFilter = {
            _id: new mongoose.Types.ObjectId(id)
        };

        const foundArticle = await Article.findOne(findFilter).exec();

        if (foundArticle === null) {
            throw new ArticleNotFoundError(`Article not found with id: ${id}`);
        }

        const filter = {
            _id: new mongoose.Types.ObjectId(id)
        };

        const payload = {
            title,
            content
        };

        return await Article.findByIdAndUpdate(filter, payload, { new: true }).exec();
    }

    async removeArticle(id) {
        const foundArticle = await Article.findById(id).exec();

        if (!foundArticle) {
            throw new ArticleNotFoundError(`Article not found with id: ${id}`);
        }

        const filter = {
            _id: new mongoose.Types.ObjectId(id)
        };

        await Article.deleteOne(filter).exec();
    }
}

module.exports = new ArticlesService();
