'use strict'

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const errorHandler = require("koa-error")
const logger = require("koa-logger")
const session = require('koa-session')

const { application, route, view } = require('./configurations')
const { passport } =  require('./middlewares')

const app = new Koa()

// session
if (!application.keys) { throw new Error("Please add session secret key in the config file!"); }
  app.keys = application.keys
// app.use(session({ store: new RedisStore() },app))
app.use(session(app))

// Passport Authentication
app.use(passport.initialize())
app.use(passport.session())

// Body parser
app.use(bodyParser())

// Logger
app.use(logger())

// Error handler
app.use(errorHandler())

// View
view.use(app)

// Routes
app.use(route.routes())
app.use(route.allowedMethods())

module.exports = app.listen(application.port, () => {
  console.log(`Server's listen on port ${application.port}`)
})