'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('lodash');
const seed = {
    dropAllCollections: async () => {
        try {
            await mongoose.connection.dropDatabase();
        } catch(err) {
            console.error('%%%%%%%%%%%%%%%%%%: ', err);
        }
    },
    dropCollection: (collection) => {
        mongoose.connection.collections[collection].drop();
    },
    seedAllCollection: () => {

    },
    seedCollection: (collection) => {

    }
};
module.exports = seed;