'use strict'

const bcrypt = require('bcrypt');
const passport = require('koa-passport');
const passportLocal = require('passport-local');
const passportJWT = require('passport-jwt');

const { Application } = require('../configurations');
const { Cache, User } = require('../models');

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const cache = new Cache(60 * 60 * 1);
const options = {};

function comparePassword(userPassword, storedPassword) {
  return bcrypt.compareSync(userPassword, storedPassword);
}

passport.serializeUser((user, done) => { done(null, user.id) });

passport.deserializeUser(async(id, done) => {
  try {
    const user = await cache.get('auth_' + id, () => {
      return User.query()
        .where('id', id)
        .andWhere('is_deleted', false)
        .select('id', 'username')
        .first();
    });
    if(!user) return done(null, false);
    return done(null, user);
  } catch(err) {
    return done(err, null);
  }
})

passport.use(new LocalStrategy(options, async(username, password, done) => {
  try {
    const user = await cache.get('auth_' + username.toLowerCase(), () => {
      return User.query()
        .where('username', username)
        .andWhere('is_deleted', false)
        .select('id', 'username', 'password', 'is_active')
        .first();
    });
    if(!user) return done({status: 'ERROR', message: 'Authentication failed', reason: 'Username or password was wrong'}, false);
    if(!comparePassword(password, user.password)) {
      return done({status: 'ERROR', message: 'Authentication failed', reason: 'Username or password was wrong' }, false);
    }
    if(!user.is_active) {
      return done({status: 'ERROR', message: 'Authentication failed', reason: 'User was not activated' }, false);
    }
    return done(null, { id: user.id, username: user.username });
  } catch(err) { 
    return done(err);
  }
}))

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: Application.secret
}, async(payload, done) => {
  try {
    const user = await cache.get('auth_' + payload.id, () => {
      return User.query()
        .where('id', payload.id)
        .andWhere('is_active', true)
        .andWhere('is_deleted', false)
        .select('id', 'username')
        .first();
    });
    if(!user) return done(null, false);
    return done(null, user);
  } catch(err) {
    return done(err);
  }
}))

module.exports = passport