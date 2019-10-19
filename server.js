'use strict';
const app = require('./app');
const https = require('https');
const fs = require('fs');
const port = process.env.PORT || 3002;
https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app).listen(port, () => {
    console.log('Listening...')
  });
  console.log('Express backend server started in ' + app.get('env') + ' mode on port ' + port);

  //used this command to generate server.key and server.cert for local certficate installation
  //openssl req -nodes -new -x509 -keyout server.key -out server.cert