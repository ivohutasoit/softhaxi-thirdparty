'use strict'

const { User } = require('../models');

/**
 * @since 1.1.0
 * @param {Object} ctx 
 */
async function user(ctx) {
  try {
    const req = ctx.request.body
    var user = await User.query()
      .where('email', req.email.toLowerCase())
      .andWhere('activation_code', req.token)
      .andWhere('is_active', false)
      .andWhere('is_deleted', false)
      .first();
    if(!user) {
      ctx.status = 404
      ctx.body = {
        status: 'ERROR',
        message: 'Not found'
      };
    } else {
      var rowNumber = await User.query()
          .update({ is_active: true, activation_code: null, updated_by: user.id })
          .where('id', user.id)
          .where('is_deleted', false);
      console.log(rowNumber);
      if(rowNumber === 1) {
        user = await User.query()
          .where('id', user.id)
          .andWhere('is_deleted', false)
          .select('id', 'username', 'email', 'is_active');

        ctx.status = 200;
        ctx.body = {
          status: 'SUCCESS',
          data: user
        };
      }
    }
  } catch(err) {
    console.log(err);
    ctx.status = 400 ;
    ctx.body = { status: 'ERROR', message: err.message || 'Error while getting tasks' };
  }
}

/**
 * @since 1.1.0
 */
module.exports = {
  user
}