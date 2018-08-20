'use strict'

const { User } = require('../../models')

async function validate(ctx, next) {
  const req = ctx.request.body
  var valid = true
  var messages = { }
  if(!req.username) {
    if(valid) valid = false;
    messages['username'] = 'required';
  } else {
    try {
      var user = await User.query()
        .where('username', req.username.toLowerCase())
        .andWhere('is_deleted', false)
        .first();
      if(user) {
        if(valid) valid = false;
        messages['username'] = 'already used other user';
      }
    } catch(error) { 
      console.log(error);
    }
  }

  if(!req.password) {
    if(valid) valid = false;
    messages['password'] = 'required';
  } else if(req.password.length < 8) {
    if(valid) valid = false;
    messages['password'] = 'min length is 8';
  }

  if(!req.email) {
    if(valid) valid = false
    messages['email'] = 'required'
  } else {
    try {
      var user = await User.query()
        .where('email', req.email.toLowerCase())
        .andWhere('is_deleted', false)
        .first();
      if(user) {
        if(valid) valid = false;
        messages['email'] = 'already used other user';
      }
    } catch(error) { 
      console.log(error);
    }
  }

  if(!req.first_name) {
    if(valid) valid = false;
    messages['first_name'] = 'required';
  }

  if(!valid) {
    ctx.status = 400
    ctx.body = {
      status: 'ERROR',
      message: messages
    }
    return ctx
  }

  return next()
}

module.exports = {
  validate
}