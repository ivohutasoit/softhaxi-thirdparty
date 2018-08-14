'use strict'

const passport = require('koa-passport')
const Router = require('koa-router')

const userRepository = require('../repositories/user.repository')
const accessValidator = require('../middlewares/validators/access.validator')

const routes = new Router()

routes.get('/', passport.authenticate('jwt', {session: false }), 
  adminAccessValidator.isAdminAccess, async(ctx) => {
  await userRepository.list().then((users) => {
    for(var user in users) {
      delete user['password']
    }

    ctx.status = 200
    ctx.body = {
      status: 'SUCCESS',
      data: users
    }
    return ctx
  }).catch((err) => {
    ctx.status = 400 
    ctx.body = { message: err.message || 'Error while getting tasks' }
    return ctx
  })
  
})

routes.get('/profile', async(ctx) => {
  ctx.status = 301
  ctx.redirect('/api/v1/profile/user')
  return ctx
})

routes.get('/:id', passport.authenticate('jwt', {session: false }), 
  adminAccessValidator.isAdminAccess, async(ctx) => {
  ctx.status = 200
  ctx.body = {
    status: 'SUCCESS',
    message: 'User detail with id as parameter is still underdevelopment'
  }
  return ctx
})

module.exports = routes