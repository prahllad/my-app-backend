
const client = require('twilio')(process.env.accountSid,process.env.authToken);
const self = module.exports = {

  sendCode:async(data)=>{
   
    
    await client.verify.services(process.env.USID)
                 .verifications
                 .create({to: '+91'+data.phone, channel: 'sms'})
                 .then(verification => {return verification});
  },
  verifyCode:async(data)=>{
    try{
       let verification_check = await client.verify.services(process.env.USID)
          .verificationChecks
          .create({to: '+91'+data.phone, code: data.code});
          return verification_check;
    }catch(err){
        throw err;

    }
    
  }

}