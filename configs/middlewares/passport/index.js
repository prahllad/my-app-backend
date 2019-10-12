'use strict';
const local = require('./passport-local');
const jwt = require('./jwt');
module.exports = (passport) => {
    passport.use(jwt.strategy);
    passport.use(local.strategy);
};
