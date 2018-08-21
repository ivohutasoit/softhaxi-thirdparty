'use strict'

const { User } = require('../models');

async function validateHaveMeAdmin(ctx, next) {
  if(!ctx.state.user) {
    ctx.status = 401
    ctx.body = {
      status: 'ERROR',
      message: 'Unauthorized'
    }
    return ctx
  }
  
  const user = await User.query()
    .where('id', ctx.state.user.id)
    .andWhere('hv_admin', true)
    .andWhere('is_active', true)
    .andWhere('is_deleted', false)
    .first();

  if(!user) {
    ctx.status = 401
    ctx.body = {
      status: 'ERROR',
      message: 'Unauthorized'
    }
    return ctx
  }

  return next();
}

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
  validateHaveMeAdmin,
  isAdminAccess
}