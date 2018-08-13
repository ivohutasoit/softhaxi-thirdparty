'use strict'

const passport = require('koa-passport')
const Router = require('koa-router')

const profileRepository = require('../repositories/profile.repository')
const userRepository = require('../repositories/user.repository')

const routes = new Router()

routes.get('/user', passport.authenticate('jwt', {session: false }), async(ctx) => {
  await userRepository.findById(ctx.state.user.id).then(async(user) => {
    var userProfile = {
      id: user.id, username: user.username, email: user.email, is_active: user.is_active
    }

    await profileRepository.findById(ctx.state.user.id).then((profile) => {
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