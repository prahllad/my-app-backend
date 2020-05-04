const AWS = require('aws-sdk');
const multer = require('multer');
const dotenv = require('dotenv');
const fs = require('fs');
BUCKET_NAME = 'angular-image';
dotenv.config();
class imageUpload{
    constructor(){}
    async s3Upload(file){

        let s3bucket = new AWS.S3({
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY,
            Bucket: 'angular-image',
          });
    
       let res = new Promise((resolve,reject)=>{
        s3bucket.createBucket(function () {
          var params = {
            Bucket: BUCKET_NAME,
            Key: file.filename,
            Body: fs.createReadStream(file.path),
            ACL: "public-read"
          };
          s3bucket.upload(params, function (err, data) {
            if (err) {
              console.log('error in callback');
              console.log(err);
              reject(err);
            }
            resolve(data);
  
          });
        });

       })
       return await res;
     
     
     
      
    }
}
module.exports = new imageUpload();