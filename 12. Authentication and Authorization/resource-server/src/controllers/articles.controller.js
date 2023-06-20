const { StatusCodes } = require('http-status-codes');
const { ArticlesService } = require('../services');
const { definePermissionsFor } = require('../authorization');
const { InsufficientPermissionsError } = require('../errors');

class ArticlesController {
    constructor() {
        this.offsetPaginated = this.offsetPaginated.bind(this);
        this.getById = this.getById.bind(this);
        this.addArticle = this.addArticle.bind(this);
        this.updateArticle = this.updateArticle.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
    }

    async offsetPaginated(req, res, next) {
        try {
            const ability = definePermissionsFor(req.user);

            if (!ability.can('read', 'articles')) {
                return next(new InsufficientPermissionsError('Only readers or editors can get an article by id'));
            }
            
            let { page, limit } = req.query;

            page = parseInt(page || 1, 10);
            limit = parseInt(limit || 10, 10);

            const articles = await ArticlesService.getArticlesOffsetPaginated(page, limit);

            return res.status(StatusCodes.OK).json(articles);
        } catch (err) {
            return next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const ability = definePermissionsFor(req.user);

            if (!ability.can('read', 'articles')) {
                return next(new InsufficientPermissionsError('Only readers or editors can get an article by id'));
            }

            const { id } = req.params;

            const foundArticle = await ArticlesService.getArticleById(id);

            return res.status(StatusCodes.OK).json(foundArticle);
        } catch (err) {
            return next(err);
        }
    }

    async addArticle(req, res, next) {
        try {
            const ability = definePermissionsFor(req.user);

            if (!ability.can('create', 'articles')) {
                return next(new InsufficientPermissionsError('Only editors can create an article!'));
            }

            const { title, content, author } = req.body;

            const createdArticle = await ArticlesService.addArticle(title, content, author);

            return res.status(StatusCodes.CREATED).json(createdArticle);
        } catch (err) {
            return next(err);
        }
    }

    async updateArticle(req, res, next) {
        try {
            const { id } = req.params;

            const ability = definePermissionsFor(req.user);

            const foundArticle = await ArticlesService.getArticleById(id);

            if (!ability.can('update', foundArticle)) {
                return next(new InsufficientPermissionsError('Only editors can edit an article!'));
            }

            const { title, content } = req.body;

            const updatedArticle = await ArticlesService.updateArticle(id, title, content);

            return res.status(StatusCodes.OK).json(updatedArticle);
        } catch (err) {
            return next(err);
        }
    }

    async deleteArticle(req, res, next) {
        try {
            const { id } = req.params;

            const ability = definePermissionsFor(req.user);

            const foundArticle = await ArticlesService.getArticleById(id);

            if (!ability.can('delete', foundArticle)) {
                return next(new InsufficientPermissionsError('Only editors can delete an article!'));
            }

            await ArticlesService.removeArticle(id);

            res.status(StatusCodes.NO_CONTENT);

            return res.end();
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new ArticlesController();
