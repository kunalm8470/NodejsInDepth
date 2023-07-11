const { StatusCodes } = require('http-status-codes');
const { JobsService } = require('../services');

class JobsController {
    constructor() {
        this.sendEmail = this.sendEmail.bind(this);
    }

    async sendEmail(req, res, next) {
        try {
            await JobsService.sendEmail(req.body);

            res.status(StatusCodes.ACCEPTED);

            return res.end();
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new JobsController();
