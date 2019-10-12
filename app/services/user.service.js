'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');
const emailHelper = require('./../helpers/email.helper');
const constant = require('./../../configs/constants');
module.exports = class UserService {
    constructor() {

    }
    async signup(user) {
        if (!emailHelper.validateEmail(user.email))
            throw constant.errors.E_INVALID_EMAIL;
        const newUser = new User(user);
        return await newUser.save();
    }
};