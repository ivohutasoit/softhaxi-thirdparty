'use strict'

async function isAdminAccess(ctx, next) {
  if(!ctx.state.user.hv_admin) {
    ctx.status = 401
    ctx.body = {
      status: 'ERROR',
      message: 'Unauthorized'
    }
    return ctx
  }

  return next()
}

module.exports = {
  isAdminAccess
}