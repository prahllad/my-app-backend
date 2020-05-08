'use strict';
const isAuthenticated = require('./../../../configs/middlewares/is-authenticated');
const userController = require('./../../controllers/v1/user.controller');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path'); 
// const upload = multer({ dest: 'uploads/' });
var storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)
  
        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
  })
  var upload = multer({ storage: storage });
const PROTECTED = [
    { type: 'GET', path: '/user', handlers: [isAuthenticated, userController.index] },
    { type: 'GET', path: '/user/:email', handlers: [userController.checkUserExist] },
    { type: 'POST', path: '/user/signup', handlers: [userController.signup] },
    { type: 'POST', path: '/user/signin', handlers: [userController.signin] },
    { type: 'GET',  path: '/auth/loginlink/:type', handlers: [userController.authLink] },
    { type: 'POST', path: '/auth/loginlink/:type', handlers: [isAuthenticated ,userController.authLink] },
    { type: 'POST', path: '/auth/user', handlers: [userController.authUser]},
    { type: 'POST', path: '/setPassword', handlers: [userController.resetPassword]},
    { type: 'POST', path: '/sendcode', handlers: [isAuthenticated,userController.sendCode]},
    { type: 'POST', path: '/login/phone', handlers: [userController.loginWithPhone]},
    { type: 'POST', path: '/disconnect/auth',handlers:[isAuthenticated,userController.disconnectAuth]},
    { type: 'POST', path: '/social/profile',handlers:[isAuthenticated,userController.connectProfile]},
    { type: 'POST', path: '/update/info',handlers:[isAuthenticated,userController.updateProfile]},
    { type: 'POST', path: '/remove/user',handlers:[isAuthenticated,userController.deleteUser]},
    { type: 'POST', path: '/upload',handlers:[upload.single('image'),isAuthenticated,userController.imageUpload]}
    


    
];
const PUBLIC = [
    { type: 'GET', path: '', handlers: [(req,res)=>{res.send('hello')}] },
];
module.exports = {
    PROTECTED,
    PUBLIC
}