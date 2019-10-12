'use strict';
module.exports = (res, err) => {
    return res.status(err.code || 400).send({
        error: {
            code: err.code || 400,
            err_message: err.err_message || ''
        }
    });
};