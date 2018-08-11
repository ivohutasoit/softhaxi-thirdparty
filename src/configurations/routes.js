'use strict'

const Router = require('koa-router')

const application = require('./application')
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')

const routes = new Router()
const apiV1 = new Router({ prefix: '/api/v1' })

routes.get('/', async(ctx) => {
  ctx.render('index', { title : application.name }, true)
})

apiV1.use('/auth', authController.routes(), authController.allowedMethods())
apiV1.use('/user', userController.routes(), userController.allowedMethods())

routes.use(apiV1.routes(), apiV1.allowedMethods())

module.exports = routes