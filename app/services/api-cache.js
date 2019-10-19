'use strict';

const redisClient = require('../../configs/redis');
const Promise = require('bluebird');

class ApiCache {

    constructor() {
    }

    setObject(key, object, timeUnit, time) {
        //remove / from routes to remove issues while deleting keys
        key = key.replace(/\//g, '');
        redisClient.set(key, JSON.stringify(object), timeUnit, time, (err, result) => {
            if (err) {
                console.log('cannot save object in cache because ', err);
                return;
            }
            console.info('Request cached ', key, result);
        });
    }

    getObject(key) {
        key = key.replace(/\//g, '');
        return redisClient.getAsync(key).then(object => JSON.parse(object));
    }

    deleteKeys(keys) {
        let delPromises = [];
        let stringKeys = [];

        if (keys && Array.isArray(keys)) {
            stringKeys = keys;
        } else {
            stringKeys.push(keys);
        }

        stringKeys.forEach(key => {
            if (!key.startsWith('__express__')) { key = '__express__' + key; }
            key = key.replace(/\//g, '');

            console.log('removing key from redis ', key);
            delPromises.push(redisClient.delAsync(key));
        });

        return Promise.all(delPromises);
    }

    deleteSubscriptionCache(keys) {
        let delPromises = [];
        let stringKeys = [];

        if (keys && Array.isArray(keys)) {
            stringKeys = keys;
        } else {
            stringKeys.push(keys);
        }

        stringKeys.forEach(key => {
            // if (!key.startsWith('__express__')) { key = '__express__' + key; }
            key = key.replace(/\//g, '');
            console.log('removing key from redis ', key);
            delPromises.push(redisClient.delAsync(key));
        });

        return Promise.all(delPromises);
    }

    getAllKeys(matching) {
        return redisClient.keysAsync(matching);
    }

    isCacheActive() {
        return redisClient.connected;
    }
    deleteKey(key){
        return redisClient.delAsync(key);
    }
    incrementKey(key) {
        redisClient.incr(key,(err)=>{
            if(err) console.log(err)
        })
    }
    getKey(key) {
        return redisClient.getAsync(key)
    }
    setKey(key,value) {
    redisClient.set(key,value,(err,result)=>{
        if(err) console.log(err)
    })
    }
}

module.exports = new ApiCache();