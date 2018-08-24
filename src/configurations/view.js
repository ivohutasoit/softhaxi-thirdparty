'use strict'

const Pug = require('koa-pug')

const view = new Pug({
  viewPath: './src/views',
  basedir: './src/views'
})

/**
 * @since 1.0.0
 */
module.exports = view