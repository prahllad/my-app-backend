const uuid = require('node-uuid');
const redisCache = require('./api-cache');
const mongoose = require('mongoose');

module.exports = class {
    constructor() { }
    async createSession(userId){
        let sessions ={};
        return await redisCache.setObject(userId, sessions, 'EX', 24 * 60 * 60 * 1000 * 365);


    }
    
};