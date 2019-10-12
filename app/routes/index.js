'use strict';
const controller = require('../../app/controllers');
const constants = require('./../../configs/constants');
const response = require('./../response');
module.exports = (app) => {
    app.get('/', controller.index);
    app.use('/api/v1', require('./v1')());
    app.use((req, res) => {
        return response.error(res, constants.errors.E_NOT_FOUND)
    });
};
