const googleHelper = require('./googleAuth');
const facebookHelper = require('./facebookAuth');
const UserService = require('./user.service');
const userHelper = require('./../helpers/user.helper');
module.exports ={
    getloginLink:async(data,user)=>{
        if(data==='google'){
            return await googleHelper.getgooglelink(user)

        }
        else{
            return await facebookHelper.getLogInLink(user);

        }

    },
    getOauthUser:async(data,user = null)=>{
        if(data.type!=='fb'){
            return await googleHelper.getOauthUser(data,user)

        }
        else{
            return await facebookHelper.getOauthUser(data,user);

        }
    },
    createAuthuser:async(user,type)=>{
        let data ={
            'email':user.email,
            'name':user.name,
        };
        if(type==='fb'){
            data['facebookAuth.auth_active'] = true;
            data['facebookAuth.user_id'] = user.id;
        }
        else{
            data['googleAuth.auth_active'] = true;
            data['googleAuth.user_id'] = user.id;

        }
        const userService = new UserService();
        return await userService.signup(data);
    },
    disConnectAuth:async(type,id)=>{
        return await userHelper.updateSocialAccount(type,id);

    }

}