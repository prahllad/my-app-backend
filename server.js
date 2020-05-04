'use strict';
const app = require('./app');
const http = require('http');
const port = process.env.PORT || 3002;
const server = http.createServer(app);
server.listen(port);
console.log('Express v-kart backend server started in ' + app.get('env') + ' mode on port ' + port);