'use strict'

async function validateRegistrationToken(ctx, next) {
  const request = ctx.request.body
  var valid = true
  messages = {}

  if(!request.email) {
    if(valid) valid = false
    messages['email'] = 'required'
  }

  if(!request.token) {
    if(valid) valid = false
    messages['token'] = 'required'
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
  validateRegistrationToken
}