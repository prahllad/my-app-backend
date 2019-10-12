'use strict';
module.exports = (res, success, data) => {
    return res.status(success.code || 200).send({
        data: data
    });
};