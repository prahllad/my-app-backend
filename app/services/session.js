
const redisCache = require('./api-cache');
const mongoose = require('mongoose');


module.exports = class {
    constructor() { }
    async createSession(userId,useAgent){
        let sessions =  await this.getAllSessions(userId);

        sessions.push(useAgent);
        return await redisCache.setObject(userId, sessions, 'EX', 24 * 60 * 60 * 1000 * 365);


    }
    async getAllSessions(user_id) {
        return await redisCache.getObject(user_id);
    }
    
};