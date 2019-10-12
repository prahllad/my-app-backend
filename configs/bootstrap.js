'use strict';
const fs = require('fs');
const join = require('path').join;

// Bootstrap models
const models = join(__dirname, './../app/models');
fs.readdirSync(models)
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => require(join(models, file)));