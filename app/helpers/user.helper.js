'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');
const emailHelper = require('./email.helper');
const constant = require('./../../configs/constants');
const hashHelper = require('./hash.helper');

const userHelper = {
    async resetPassword(data) {
        // if (!emailHelper.validateEmail(dataemail))
        //     throw constant.errors.E_INVALID_EMAIL;s
        let password = hashHelper.generateHash(data.password);
        const user = await User.findOneAndUpdate({email: data.email},{$set:{password:password}}).lean();
        if (user)
            return user;
        throw constant.errors.E_USER_NOT_FOUND;
    },
    async getUser(id) {
        const user = await User.findById(id).lean();
        if (user)
            return user;
        throw constant.errors.E_USER_NOT_FOUND;
    },
    async getUserByEmail(email) {
        const user = await User.findOne({email: email}).lean();
        if (user)
            return user;
        throw constant.errors.E_USER_NOT_FOUND;
    },
    async getUserByAuthId(authId) {
        const user = await User.findOne({'googleAuth.user_id': authId}).lean();
        return user;
        // throw constant.errors.E_USER_NOT_FOUND;
    },
    async getUserByPhone(data) {
        const user = await User.findOne({'phone': data.phone}).lean();
        if(user)
        return user;
        throw constant.errors.E_USER_NOT_FOUND;
    },
    async updateUser(data){
        const user = await User.findOneAndUpdate({_id: data.id},{$set:{phone:data.phone}},{new: true}).lean();
        if(user){
            return user;
        }
    },
    async signup(user) {
        try {
            if (!emailHelper.validateEmail(user.email))
                throw constant.errors.E_INVALID_EMAIL;
            let newUser = new User(user);
            let res = await newUser.save();
            return res;
        } catch (err) {
            throw err;
        }
       
    },
    async updateSocialAccount(type, id) {
        let data = {};
        if (type === 'facebook') {
            data['facebookAuth.auth_active'] = false;
            data['facebookAuth.user_id'] = '';
        }
        else {
            data['googleAuth.auth_active'] = false;
            data['googleAuth.user_id'] = '';

        }
        return await User.findByIdAndUpdate(id, { $set: data }, { new: true });

    },
    async connectSocialAccount(id, user, type) {
        let data = {};
        if (type === 'fb') {
            data['facebookAuth.auth_active'] = true;
            data['facebookAuth.user_id'] = user.id;
        }
        else {
            data['googleAuth.auth_active'] = true;
            data['googleAuth.user_id'] = user.id;

        }
        return await User.findByIdAndUpdate(id, { $set: data }, { new: true });

    },
    
};
module.exports = userHelper;