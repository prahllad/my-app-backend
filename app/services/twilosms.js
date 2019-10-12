const accountSid = 'ACd77811db734c88b0036d26db8197c046';
const authToken = '8adc8d78a20c25e14e5a66a51e044bf5';
const USID = 'VA40a1e3876c415c66e2fd9599a1ee1777';
const client = require('twilio')(accountSid, authToken);
const self = module.exports = {

  sendCode:async(data)=>{
   
    
    await client.verify.services(USID)
                 .verifications
                 .create({to: '+91'+data.phone, channel: 'sms'})
                 .then(verification => {return verification});
  },
  verifyCode:async(data)=>{
    try{
       let verification_check = await client.verify.services(USID)
          .verificationChecks
          .create({to: '+91'+data.phone, code: data.code});
          return verification_check;
    }catch(err){
        throw err;

    }
    
  }

}