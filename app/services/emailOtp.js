const sgMail = require('@sendgrid/mail');
// import { authenticator } from 'otplib';
const otplib = require('otplib');

var otpArray =[];
class email2Fa{
    constructor(){}
    
    async sendMail(email){
        const secret = otplib.authenticator.generateSecret();
        const token = otplib.authenticator.generate(secret);
        otpArray.push({id:email,otp:token,secret:secret});
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: email,
            from: 'royprahllad3@gmail.com',
            subject: 'Verify your authentiaction',
            text: 'one time otp based authentication',
            html: '<strong>'+ token +'</strong>',
        };
        try{
            sgMail
                .send(msg)
                .then((res) => {
                    console.log(res);
                 }, error => {
                    console.error(error);

                    if (error.response) {
                        console.error(error.response.body)
                    }
                });
        } catch(err){
            console.log(err);
        }
        
    }
    async verifyToken(user)
    {
        let index = otpArray.findIndex((el)=>el.otp===user.otp);
        if(index==-1){
            return false;
        }
        else if(otpArray[index] && otpArray[index].id!==user.email){
            return false;
        }
        else{
            return true;
        }
        


    }

}
module.exports = new email2Fa();