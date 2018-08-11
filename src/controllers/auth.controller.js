'use strict'

const jwt = require('jsonwebtoken')
const moment = require('moment')
const Router = require('koa-router')
const passport = require('koa-passport')
const application = require('../configurations/application')

const routes = new Router()

routes.post('/register', async(ctx) => {

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

module.exports = routes