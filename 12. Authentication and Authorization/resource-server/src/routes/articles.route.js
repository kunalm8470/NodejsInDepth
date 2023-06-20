const express = require('express');
const router = express.Router();

const { ArticlesController } = require('../controllers');
const { AuthenticateJWTMiddleware, ValidateRequestRouteParameterMiddleware, ValidateRequestBodyMiddleware } = require('../middlewares');

const { AddArticleSchema, UpdateArticleSchema, ValidateObjectIdSchema } = require('../schemas');

router.get('/', AuthenticateJWTMiddleware, ArticlesController.offsetPaginated);
router.get('/:id', AuthenticateJWTMiddleware, ValidateRequestRouteParameterMiddleware(ValidateObjectIdSchema), ArticlesController.getById);
router.post('/', AuthenticateJWTMiddleware, ValidateRequestBodyMiddleware(AddArticleSchema), ArticlesController.addArticle);
router.put('/:id', AuthenticateJWTMiddleware, ValidateRequestRouteParameterMiddleware(ValidateObjectIdSchema), ValidateRequestBodyMiddleware(UpdateArticleSchema), ArticlesController.updateArticle);
router.delete('/:id', AuthenticateJWTMiddleware, ValidateRequestRouteParameterMiddleware(ValidateObjectIdSchema), ArticlesController.deleteArticle);

module.exports = router;
