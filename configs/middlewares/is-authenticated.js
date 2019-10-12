'use strict';
const passport = require('passport');
const constants = require('./../../configs/constants');
const response = require('./../../app/response');
module.exports = (req, res, next) => {
    passport.authenticate('jwt', async (error, user, info) => {
        try {
            if(error)
                throw error;
            else if(info && info.name === 'TokenExpiredError')
                throw constants.errors.E_SESSION_EXPIRED;
            else
                req.user = user;
            next();
        }catch(err) {
            return response.error(res, err);
        }
    })(req, res);
};