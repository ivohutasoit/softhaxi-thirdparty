'use strict'

async function validate(ctx, next) {
  const req = ctx.request.body;

  var valid = true
  var messages = { }
  if(!req.username) {
    if(valid) valid = false;
    messages.username = 'required';
  }

  if(!req.password) {
    if(valid) valid = false;
    messages.password = 'required';
  }

  if(!valid) {
    ctx.status = 400;
    ctx.body = {
      status: 'ERROR',
      messages: messages
    };
    return ctx;
  }

  return next();
}

module.exports = {
  validate
};