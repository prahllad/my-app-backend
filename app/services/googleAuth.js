const Promise = require('bluebird');
const qs = require('qs');
const userHelper = require('./../helpers/user.helper');
const constant = require('./../../configs/constants');
const request = Promise.promisify(require("request"));
Promise.promisifyAll(request, { multiArgs: true });
const self = module.exports={
   getgooglelink:async(user)=>{
        state = Math.floor(Math.random() * 1e18);
        let params = {
            response_type: 'code',
            client_id: process.env.GOOGLE_CLIENT_ID,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            include_granted_scopes: true,
            state: 'g' + state,
            access_type: 'offline',
            scope: "https://www.googleapis.com/auth/plus.login email"
        };
        if(user){
            params['redirect_uri'] = process.env.GOOGLE_REDIRECT_URI+'/protected';
        }
        params = qs.stringify(params);
        //console.log(params);
        let link = process.env.GOOGLE_LINK_OPENER + params;
        return Promise.resolve({'link':link});

    },
     getOauthUser:(data,user = null)=> {
        return Promise.coroutine(function* () {
            let response =yield self.getAccessToken(data.code,user);
            response = JSON.parse(response['1']);
            console.log(response);
            if (response['error']) throw self.errorObject(response);
            let userResponse = yield self.getUser(response['access_token']);
            userResponse = JSON.parse(userResponse['1']);
            if (userResponse['error']) throw this.errorObject(userResponse['error']);
            return userResponse;
        }).apply(this);
    },
    getAccessToken:(code, user)=> {
        let params = {
            code: code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type: 'authorization_code'
        }
        if(user){
            params['redirect_uri']= process.env.GOOGLE_REDIRECT_URI+'/protected';
        }
        //console.log(params);
        let url = process.env.GOOGLE_TOKEN_GETTER;
        return request.postAsync(url, { form: params });
    },
    getUser(access_token) {
        let url = `${process.env.GOOGLE_USER_LINK}access_token=${access_token}`
        //console.log(url);
        return request.getAsync(url);
    },
    errorObject(error) {
        let err = new Error;
        err.code = error.code || '';
        err.message = error.message || error.error_description || '';
        err.type = error.type || '';
        return err;
    }

}