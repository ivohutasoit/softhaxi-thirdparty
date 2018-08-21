'use strict'

const { User } = require('../models');

async function list(ctx) {
  try {
    const users = await User.query()
      .where('hv_admin', false)
      .andWhere('is_deleted', false)
      .select('id', 'username', 'email', 'mobile', 'is_active', 'created_at');
      ctx.status = 200;
      ctx.body = {
        status: 'SUCCESS',
        data: users
      };
  } catch(err) {
    ctx.status = 400;
    ctx.body = { status: 'ERROR', message: err.message || 'Error while getting tasks' };
  }
}

async function detail(ctx) {
  try {
    const user = await User.query()
      .where('id', ctx.params.id)
      .andWhere('hv_admin', false)
      .andWhere('is_deleted', false)
      .select('id', 'username', 'email', 'mobile', 'is_active', 'is_deleted', 'created_at', 'updated_at')
      .first();
    if(!user) {
      ctx.status = 404
      ctx.body = {
        status: 'ERROR',
        message: 'Not found'
      }
    } else {
      ctx.status = 200;
      ctx.body = {
        status: 'SUCCESS',
        data: user
      };
    }
  } catch(err) {
    ctx.status = 400;
    ctx.body = { status: 'ERROR', message: err.message || 'Error while getting tasks' };
  }
} 

module.exports = {
  list, detail
}