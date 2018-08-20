'use strict'

const Router = require('koa-router');
const passport = require('koa-passport');

const validator = require('../middlewares/validators');
const controller = require('../controllers');

const v1 = new Router({ prefix: '/api/v1'});

// User Authentication
v1.post('/auth/register', validator.register.validate, controller.Authentication.register);
v1.post('/auth/login', validator.login.validate, controller.Authentication.login);
v1.get('/auth/info', passport.authenticate('jwt', {session: false }), controller.Authentication.info);

// User Maintenance

// User Profiling

// User & Application Activation
v1.post('/activate/user', validator.activation.validate, controller.Activation.user);

module.exports = v1;