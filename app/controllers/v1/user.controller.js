'use strict';
const passport = require('passport');
const constants = require('./../../../configs/constants');
const response = require('./../../response');
const UserService = require('./../../services/user.service');
const jwtHelper = require('./../../helpers/jwt.helper');
const userHelper = require('./../../helpers/user.helper');
const authHelper = require('./../../services/authHelper');
const smsService = require('./../../services/twilosms');
const sessionService = require('./../../services/session');
const S3 = require('./../../services/aws-s3');
const emailVerification = require('./../../services/emailOtp');
module.exports = {
    index: async (req, res) => {
        try {
            const user = await userHelper.getUser(req.user.id);
            return response.success(res, constants.success.OK, user);
        } catch (err) {
            return response.error(res, err);
        }
    },
    checkUserExist: async (req, res) => {
        try {
            const user = await userHelper.getUserByEmail(req.params.email);
            await emailVerification.sendMail(req.params.email);
            return response.success(res, constants.success.OK, user);
        } catch (err) {
            return response.error(res, err);
        }
    },
    signup: async (req, res) => {
        try {
            // const userService = new UserService();
            let user = await userHelper.signup(req.body);
            return response.success(res, constants.success.CREATED, {token: jwtHelper.createToken(user) });
        } catch (err) {
            console.log('errrr: ', err);
            return response.error(res, err);
        }
    },
    signin: async (req, res) => {
        let valid = await emailVerification.verifyToken(req.body);
        if(!valid) return response.error(res, constants.errors.E_INVALID_OTP);
        passport.authenticate('local', { session: false }, (err, user) => {
            try {
                if (err)
                    throw err;
                
                return response.success(res, constants.success.OK, { token: jwtHelper.createToken(user) });
            } catch (err) {
                return response.error(res, err);
            }
        })(req, res);
    },
    
    authLink: async(req, res) => {
        try {
            const loginLink = await authHelper.getloginLink(req.params.type,req.user);
            return response.success(res, constants.success.OK, loginLink);
        } catch(err) {
            return response.error(res, err);
        }
    },
    authUser: async (req, res) => {
        try {
            const user = await authHelper.getOauthUser(req.body);
            let userExist = await userHelper.getUserByAuthId(user.id);
            if (userExist) {
                return response.success(res, constants.success.OK, {user: user, token: jwtHelper.createToken(userExist) });
                
            }
            else{

                let data = await authHelper.createAuthuser(user,req.body.type);
                return response.success(res, constants.success.OK, data);
            }

        } catch (err) {
            return response.error(res, err);
        }
    },
    disconnectAuth: async (req, res) => {
        try {
            const user = await authHelper.disConnectAuth(req.body.type,req.user.id);
            return response.success(res, constants.success.OK, user);
        } catch(err) {
            return response.error(res, err);
        }
    },
    connectProfile:async(req,res) =>{
        try{
            const user = await authHelper.getOauthUser(req.body,req.user);
            const data = await userHelper.connectSocialAccount(req.user.id,user,req.body.type);
            return response.success(res, constants.success.OK, data);            
            

        }catch(err){
            return response.error(res,err);

        }
    },
    sendCode: async (req, res) => {
        try {
            if (req.body.phone && !req.body.code) {
                let res = await smsService.sendCode(req.body);
            }
            else {
                let sms = await smsService.verifyCode(req.body);
                if (sms.status == "approved" && sms.valid == true) {
                    let user = await userHelper.updateUser({ id: req.user.id, phone: req.body.phone });
                    return response.success(res, constants.success.OK, user);

                }

            }

        } catch (err) {
            return response.error(res, err);
        }
    },
    loginWithPhone: async (req, res) => {
        try {
            if (req.body.phone && !req.body.code) {
                const userExist = await userHelper.getUserByPhone(req.body);

                if (userExist) {
                    await smsService.sendCode(req.body);
                    return response.success(res, constants.success.OK, userExist);

                }
            }
            else {
                let user;
                let sms = await smsService.verifyCode(req.body);
                if (sms.status == "approved" && sms.valid == true) {
                    user = await userHelper.getUserByPhone(req.body);
                    await (new sessionService().createSession(user.email, req.body.userAgent));

                    return response.success(res, constants.success.OK, {user: user, token: jwtHelper.createToken(user) });

                }

            }

        } catch (err) {
            return response.error(res,err);


        }

    },
    resetPassword: async(req, res) => {
        try {
            const user = await userHelper.resetPassword(req.body);
            return response.success(res,constants.success.OK,'');
            // passport.authenticate('local', { session: false }, (err, user) => {
            //     try {
            //         if(err)
            //             throw err;
            //         return response.success(res, constants.success.OK, {token: jwtHelper.createToken(user)});
            //     }catch(err) {
            //         return response.error(res, err);
            //     }
            // })(req, res);
        } catch(err) {
            return response.error(res, err);
        }
    },
   
    updateProfile:async(req,res)=>{
        try{
            const user = await userHelper.updateInfo(req.user.id,req.body.email);
            return response.success(res,constants.success.OK,user);

        }
        catch(err){
            return response.error(res,err);
        }
    },
    deleteUser:async(req,res)=>{
        try{
            const user = await userHelper.removeUser(req.user.id);
            return response.success(res,constants.success.OK,user);
        }
        catch(err){
            return response.error(res,err);
        }
    },
    imageUpload:async(req,res,next)=>{
        try{
            // console.log(req.file);
                let url = await S3.s3Upload(req.file);
                return response.success(res,constants.success.OK,url.Location)
        }
        catch(err){

        }

    }
};
