'use strict'

async function validateUserRegistration(ctx, next) {
  const request = ctx.request.body
  var valid = true
  var messages = { }
  if(!request.username) {
    if(valid) valid = false
    messages['username'] = 'required'
  }

  if(!request.password) {
    if(valid) valid = false
    messages['password'] = 'required'
  }

  if(!request.email) {
    if(valid) valid = false
    messages['email'] = 'required'
  }

  if(!request.first_name) {
    if(valid) valid = false
    messages['first_name'] = 'required'
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
  validateUserRegistration
}