'use strict';
module.exports = Object.freeze({
    E_SESSION_EXPIRED: {
        code: 400,
        name: 'E_SESSION_EXPIRED',
        err_message: 'Session expired please re-login.'
    },
    E_ERROR: {
        code: 400,
        name: 'E_ERROR',
        err_message: 'Something went wrong.'
    },
    E_UNAUTHORIZED: {
        code: 401,
        name: 'E_UNAUTHORIZED',
        err_message: 'You are unauthorized to access the requested resource'
    },
    E_INVALID_CREDENTIALS: {
        code: 403,
        name: 'E_INVALID_CREDENTIALS',
        err_message: 'Invalid email or password.'
    },
    E_NOT_FOUND: {
        code: 404,
        name: 'E_NOT_FOUND',
        err_message: 'Request not found.'
    },
    E_USER_NOT_FOUND: {
        code: 404,
        name: 'E_USER_NOT_FOUND',
        err_message: 'User not exist.'
    },
    E_DUPLICATE_EMAIL: {
        code: 409,
        name: 'E_DUPLICATE_EMAIL',
        err_message: 'Email already registered.'
    },
    E_INVALID_EMAIL: {
        code: 420,
        name: 'E_INVALID_EMAIL',
        err_message: 'Invalid Email.'
    }
    
});