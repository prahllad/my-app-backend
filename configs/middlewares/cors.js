'use strict';
const cors = require('cors');
module.exports = cors({
    origin: ['http://localhost:4200','https://first-angular1-app1.herokuapp.com'],
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'X-HTTP-Method-Override', 'Content-Type', 'Accept', 'Content-Encoding', 'Authorization', 'api-key'],
    credentials: true
});
