'use strict'

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const lodash = require('lodash/string');
const moment = require('moment');
const passport = require('koa-passport');
const pincode = require('generate-pincode');
const uuid = require('uuid/v1');

const { Application } = require('../configurations');
const { Cache, Profile, User } = require('../models');

const cache = new Cache(60 * 60 * 1);

async function register(ctx) {
  try {
    const req = ctx.request.body;
    const id = uuid();
    const user = await User.query().insert({
      id: id,
      username: req.username.toLowerCase(),
      email: req.email.toLowerCase(),
      password: bcrypt.hashSync(req.password, bcrypt.genSaltSync()),
      activation_code: pincode(4),
      created_by: id
    });

    if(user) {
      try {
        const profile = await Profile.query().insert({
          id: user.id,
          first_name: lodash.capitalize(req.first_name),
          last_name: !req.last_name ? lodash.capitalize(req.first_name) 
                : lodash.capitalize(req.last_name),
          email: req.email.toLowerCase(),
          created_by: user.id
        });

        if(profile) {
          ctx.status = 201;
          ctx.body = { 
            status: 'SUCCESS', 
            data: { 
              id: user.id, 
              username: user.username, 
              activation_code: user.activation_code, 
              is_active: user.is_active 
            }  
          };
        } else {
          User.query().deleteById(user.id);
        }
      } catch(err) {
        User.query().deleteById(user.id);
        console.error(err);
        ctx.status = 400;
        ctx.body = { status: 'ERROR', message: err.message || 'Sorry, an error has occurred.' };
      }
    }
  } catch(err) {
    console.error(err);
    ctx.status = 400;
    ctx.body = { status: 'ERROR', message: err.message || 'Sorry, an error has occurred.' };
  }
}

async function login(ctx) {
  try {
    return passport.authenticate('local', async(err, user, info, status) => {
      if(err) {
        ctx.status = 401;
        ctx.body = err;
      } else { 
        const token = jwt.sign({ 
            id: user.id, 
            exp: moment().add(14, 'days').unix(),
            iat: moment().unix(),
            sub: user.username
        }, Application.secret);

        ctx.status = 200;
        ctx.body = {
          status: 'SUCCESS',
          token: token
        };
      }
    }) (ctx);
  } catch(err) {
    console.error(err)
    ctx.status = 400;
    ctx.body = { status: 'ERROR', message: err.message || 'Sorry, an error has occurred.' };
  }
}

async function info(ctx) {
  const user = await cache.get('info_' + ctx.state.user.id, () => {
    return User.query()
    .where('id', ctx.state.user.id)
    .andWhere('is_deleted', false)
    .select('id', 'username', 'is_active', 'created_at')
    .first();
  });

  if(!user) {
    ctx.status = 401;
    ctx.body = {
      status: 'ERROR',
      message: 'Authentication failed'
    };
  }

  ctx.status = 200;
  ctx.body = {
    status: 'SUCCESS',
    data: {
      authenticated: true,
      user: user
    }
  };
}

module.exports = {
  register, login, info
}