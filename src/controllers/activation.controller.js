'use strict'

const Router = require('koa-router')

const activationValidator = require('../middlewares/validators/activation.validator')
const userRepository = require('../repositories/user.repository')

const routes = new Router()

routes.post('/user', activationValidator.validateRegistrationToken, async(ctx) => {
  await userRepository.activate(ctx.request.body).then((user) => {
    if(!user) {
      ctx.status = 404
      ctx.body = { 
        status: 'ERROR',
        message: 'Not found' 
      }
      return ctx
    }

    ctx.status = 200
    ctx.body = { 
      status: 'SUCCESS', 
      data: { id: user.id, username: user.username, email: user.email, is_active: user.is_active }  
    }
    return ctx
  }).catch((err) => {
    ctx.status = 400 
    ctx.body = { message: err.message || 'Error while getting tasks' }
    return ctx
  })
})

module.exports = routes