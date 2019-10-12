'use strict';
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = {
    expiresIn: '2h',
    algorithm: 'HS256',
    secret: process.env.SECRET || 'c5796a2ae795a3f3bb3c9d13b814ad357957c19c4e0637abe39f9aefb7e92940',
    issuer: "api.my-app.com",
    audience: "app.my-app.com"
};

const JWT_STRATEGY_CONFIG = {
    secretOrKey: config.secret,
    issuer: config.issuer,
    audience: config.audience,
    passReqToCallback: false,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT')
};

const _onJwtStrategyAuth = (payload, next) => {
    let user = payload.user;
    return next(null, user, {});
};

const jwtStrategy = new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth);

module.exports = {
    strategy: jwtStrategy,
    config: config
};
