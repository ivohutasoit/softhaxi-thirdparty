'use strict'

const userRepository = require('../../repositories/user.repository')

async function validateForm(ctx, next) {
  const request = ctx.request.body
  var valid = true
  var messages = { }
  if(!request.username) {
    if(valid) valid = false
    messages['username'] = 'required'
  } else {
    await userRepository.findByUsername(request.username.toLowerCase()).then((user) => {
      if(user) {
        if(valid) valid = false
        messages['username'] = 'already used other user'
      }
    }).catch((error) => { 
      console.log(error)
    })
  }

  if(!request.password) {
    if(valid) valid = false
    messages['password'] = 'required'
  } else (request.password.length < 8) {
    if(valid) valid = false
    messages['password'] = 'min length is 8'
  }

  if(!request.email) {
    if(valid) valid = false
    messages['email'] = 'required'
  } else {
    await userRepository.findByEmail(request.email.toLowerCase()).then((user) => {
      if(user) {
        if(valid) valid = false
        messages['email'] = 'already used other user'
      }
    }).catch((error) => { 
      console.log(error)
    })
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
  validateForm
}