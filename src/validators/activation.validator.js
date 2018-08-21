'use strict'

async function validate(ctx, next) {
  const req = ctx.request.body
  var valid = true
  var messages = {}

  if(!req.email) {
    if(valid) valid = false;
    messages['email'] = 'required';
  }

  if(!req.token) {
    if(valid) valid = false;
    messages['token'] = 'required';
  }

  if(!valid) {
    ctx.status = 400;
    ctx.body = {
      status: 'ERROR',
      message: messages
    };
    return ctx;
  }
    
  return next();
}

module.exports = {
  validate
}