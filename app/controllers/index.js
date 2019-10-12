'use strict';
const constants = require('./../../configs/constants');
const response = require('./../response');

module.exports = {
    index: (req, res) => {
        return response.success(res, constants.success.OK, {message: "Main#index"});
    }
};
