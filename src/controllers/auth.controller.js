'use strict'

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const lodash = require('lodash/string')
const moment = require('moment')
const pincode = require('generate-pincode')
const Router = require('koa-router')
const passport = require('koa-passport')
const uuid = require('uuid/v1')

const application = require('../configurations/application')
const profileRepository = require('../repositories/profile.repository')
const userRepository = require('../repositories/user.repository')
const registerValidator = require('../middlewares/validators/register.validator')

const routes = new Router()

routes.post('/register', registerValidator.validateForm, async(ctx) => {
  const request = ctx.request.body

  await userRepository.create({
    id: uuid(),
    username: request.username.toLowerCase(),
    email: request.email.toLowerCase(),
    password: bcrypt.hashSync(request.password, bcrypt.genSaltSync()),
    activation_code: pincode(4),
    created_by: id
  }).then(async(user) => {
    if(!user) {
      ctx.status = 400
      ctx.body = { message: 'Unable to register new user' }
      return ctx
    }
    
    await profileRepository.create({
      id: user.id,
      first_name: lodash.capitalize(request.first_name),
      last_name: !request.last_name ? lodash.capitalize(request.first_name) 
            : lodash.capitalize(request.last_name),
      email: request.email.toLowerCase(),
      created_by: user.id,
    })

    return user
  }).then((user) => {
    ctx.status = 201
    ctx.body = { 
      status: 'SUCCESS', 
      data: { id: user.id, username: user.username, activation_code: user.activation_code, is_active: user.is_active }  
    }
    return ctx
  }).catch((err) => {
    ctx.status = 400 
    ctx.body = { message: err.message || 'Error while getting tasks' }
    return ctx
  })
})

routes.post('/login', async(ctx) => {
  try {
    return passport.authenticate('local', async(err, user, info, status) => {
      if(!user) {
        ctx.status = 401
        ctx.body = { message: 'Authentication failed' }
        return ctx
      }

      if(!user.is_active) {
        ctx.status = 401
        ctx.body = { message: 'Authentication failed' }
        return ctx
      }

      const token = jwt.sign({ 
            id: user.id, 
            exp: moment().add(14, 'days').unix(),
            iat: moment().unix(),
            sub: user.username
        }, application.secret)

      ctx.status = 200
      ctx.body = {
        status: 'SUCCESS',
        token: token,
        message: 'Logged in successfully'
      }
      return ctx
    }) (ctx)
  } catch(err) {
    console.error(err)
    ctx.status = 400
    ctx.body = { message: err.message || 'Sorry, an error has occurred.' }
    return ctx
  }
})

routes.post('/logout', async(ctx) => {
    
})

routes.get('/info',  passport.authenticate('jwt', {session: false }), async(ctx) => {
  await userRepository.findById(ctx.state.user.id).then((user) => {
    if(!user) {
      ctx.status = 401
      ctx.body = {
        status: 'ERROR',
        message: 'Authentication failed'
      }
      return ctx
    }
    ctx.status = 200
    ctx.body = {
      status: 'SUCCESS',
      data: {
        authenticated: true,
        user: { id: user.id, username: user.username, is_active: user.is_active }
      }
    }
    return ctx
  }).catch((err) => {
    console.error(err)
    ctx.status = 400
    ctx.body = { message: err.message || 'Sorry, an error has occurred.' }
    return ctx
  })
})

module.exports = routes