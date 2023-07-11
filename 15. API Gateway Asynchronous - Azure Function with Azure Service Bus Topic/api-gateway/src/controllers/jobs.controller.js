const { StatusCodes } = require('http-status-codes');
const { JobsService } = require('../services');

class JobsController {
    constructor() {
        this.sendEmail = this.sendEmail.bind(this);
    }

    async sendEmail(req, res, next) {
        try {

        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new JobsController();
