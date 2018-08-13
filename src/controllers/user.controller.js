'use strict'

const passport = require('koa-passport')
const Router = require('koa-router')

const routes = new Router()

routes.get('/', passport.authenticate('jwt', {session: false }), async(ctx) => {
  ctx.status = 200
  ctx.body = {
    status: 'SUCCESS',
    message: 'User listing is still underdevelopment'
  }
  return ctx
})

routes.get('/profile', passport.authenticate('jwt', {session: false }), async(ctx) => {
  ctx.status = 301
  ctx.redirect('/api/v1/profile/user')
  return ctx
})

routes.get('/:id', passport.authenticate('jwt', {session: false }), async(ctx) => {
  ctx.status = 200
  ctx.body = {
    status: 'SUCCESS',
    message: 'User detail with id as parameter is still underdevelopment'
  }
  return ctx
})

module.exports = routes