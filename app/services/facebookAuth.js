const qs = require('qs');
const Promise = require('bluebird');
let state = '';
const request =Promise.promisify(require('request'));
const mongoose = require('mongoose');
const _ = require('lodash');
Promise.promisifyAll(request,{multiArgs: true});
const self = module.exports ={
    getLogInLink:async(user)=> {
        state = Math.floor(Math.random() * 1e18);
        //console.log("In Auth");   
        let params = {
            response_type: 'code',
            client_id: process.env.CHATBOT_APP,
            redirect_uri: process.env.REDIRECT_URI,
            state: 'f' + state,
            scope: 'email'
        };
        if(user){
            params['redirect_uri'] = process.env.FACEBOOK_REDIRECT_URI;
        }
        params = qs.stringify(params);
        // console.log(params);
        let link = process.env.FACEBOOK_LINK_OPENER + params;
        return Promise.resolve({'link':link})
    } ,
    getOauthUser(data,user = null){
        return Promise.coroutine(function*(){
            let response = yield this.getAccessToken(data.code,user);
            response = JSON.parse(response['1']);
            if(response['error']) throw this.errorObject(response['error']); 

            //console.log("response",response);

            let userResponse = yield this.getUser(response['access_token']);
            userResponse = JSON.parse(userResponse['1']);
            if(userResponse['error']) throw this.errorObject(userResponse['error']);

            return userResponse;
        }).apply(this);    
    },
    getAccessToken(code,user){
        let params = {
            code: code,
            client_secret: process.env.CHATBOT_CLIENT_SECRET,
            client_id: process.env.CHATBOT_APP,
            redirect_uri: process.env.REDIRECT_URI
        };
        if(user){
            params['redirect_uri'] = process.env.FACEBOOK_REDIRECT_URI;
        }
        let url = `${process.env.FACEBOOK_TOKEN_GETTER}client_id=${params['client_id']}
                      &client_secret=${params['client_secret']}&code=${code}&redirect_uri=${params['redirect_uri']}`;
        return request.getAsync(url);
    },
   
    errorObject(error){
        let err = new Error;
        err.code = error.code || '';
        err.status = error.status || '';
        err.errors = error.errors || '';
        err.message = error.message || error.error_description || '';
        err.type = error.type || '';
        return err;
    },
    
    getUser(token){
        let url=`${process.env.FACEBOOK_API_BASE}me?fields=id,name,email&access_token=${token}`;
        return request.getAsync(url);
    },
   
};