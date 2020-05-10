'use strict';
 require('./app');
const Express = require('express');
const app = Express();
const port = process.env.PORT || 3002;
app.listen(port,()=>{
    console.log('server is listening in port:'+port);
})