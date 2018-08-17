'use strict'

const passport = require('koa-passport')
const Router = require('koa-router')

const profileRepository = require('../repositories/profile.repository')
const userRepository = require('../repositories/user.repository')

const routes = new Router()

/**
 * 
 */
routes.get('/user/:id*', passport.authenticate('jwt', { session: false }), async(ctx) => {
  var id = ctx.state.user.id
  if(ctx.params.id) id = ctx.params.id

  await userRepository.findById(id).then(async(user) => {
    if(!user) {
      ctx.status = 404
      ctx.body = {
        status: 'ERROR',
        message: 'Not found'
      }
      return ctx
    }

    if(ctx.state.user.hv_admin != 1) {
      if(user.hv_admin == 1) {
        ctx.status = 404
        ctx.body = {
          status: 'ERROR',
          message: 'Not found'
        }
        return ctx
      }
    }
    
    var userProfile = { 
      id: user.id, 
      username: user.username, 
      email: user.email, 
      is_active: user.is_active 
    }
    await profileRepository.findById(id).then((profile) => {
      if(profile) {
        userProfile.first_name = profile.first_name
        userProfile.middle_name = profile.middle_name
        userProfile.last_name = profile.last_name
        userProfile.birth_date = profile.birth_date
        userProfile.mobile = profile.mobile 
        userProfile.nation_id = profile.nation_no
        userProfile.address = {
          street: profile.address_1,
          state: profile.address_2,
          province: profile.address_3,
          zip_code: profile.zip_code,
          country: profile.country_code
        }
      }
      if(user.id == ctx.state.user.id) userProfile.is_myself = true 
    })

    ctx.status = 200
    ctx.body = {
        status: 'SUCCESS',
        data: userProfile
    }
    return ctx
  }).catch((err) => {
    ctx.status = 400 
    ctx.body = { message: err.message || 'Error while getting tasks' }
    return ctx
  })
})

module.exports = routes