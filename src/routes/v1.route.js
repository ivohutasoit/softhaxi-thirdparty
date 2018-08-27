'use strict'

const Router = require('koa-router');
const passport = require('koa-passport');

const Validator = require('../validators');
const Controller = require('../controllers');

const v1 = new Router({ prefix: '/api/v1'});

// User Authentication
v1.post('/auth/register', Validator.register.validate, Controller.Authentication.register);
v1.post('/auth/login', Validator.login.validate, Controller.Authentication.login);
v1.get('/auth/info', passport.authenticate('jwt', {session: false }), Controller.Authentication.info);

// User Maintenance
v1.get('/user', passport.authenticate('jwt', { session: false }), 
    Validator.access.validateHaveMeAdmin, Controller.User.list);
v1.get('/user/profile/:id*', passport.authenticate('jwt', { session: false }), 
    Controller.Profile.user);
v1.get('/user/:id', passport.authenticate('jwt', { session: false }), 
    Validator.access.validateHaveMeAdmin, Controller.User.detail);

// User Profiling
v1.get('/profile/user/:id*', passport.authenticate('jwt', { session: false }), 
    Controller.Profile.user);

// User & Application Activation
v1.post('/activate/user', Validator.activation.validate, Controller.Activation.user);

module.exports = v1;