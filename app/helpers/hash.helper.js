'use strict';
const bCrypt = require('bcrypt-nodejs');
const hashHelper = {
    generateHash(value) {
        const salt = bCrypt.genSaltSync(10);
        return bCrypt.hashSync(value, salt);
    },
    compare: (plain, hashed) => {
        return bCrypt.compareSync(plain, hashed);
    }
};
module.exports = hashHelper;