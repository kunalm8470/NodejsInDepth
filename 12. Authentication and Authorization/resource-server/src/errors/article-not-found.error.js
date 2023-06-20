class ArticleNotFoundError extends Error {
    constructor(message) {
        super(message);

        this.name = 'ArticleNotFoundError';
    }
}

module.exports = ArticleNotFoundError;
