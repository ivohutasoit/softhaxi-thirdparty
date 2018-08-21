'use strict'

const { Cache, Profile, User } = require('../models');

const cache = new Cache(60 * 60 * 1);

/**
 * 
 * @param {Object} ctx 
 */
async function user(ctx) {
  try {
    var id = ctx.state.user.id;
    if(ctx.params.id) id = ctx.params.id;
    
    const userProfile = await cache.get('profile_' + id, async() => {
      const user = await User.query()
          .where('id', id)
          .andWhere('is_deleted', false)
          .select('id', 'username', 'email', 'is_active')
          .first();

      if(user) {
        const profile = await Profile.query()
          .where('id', id)
          .first();

        if(profile) {
          user.first_name = profile.first_name;
          user.middle_name = profile.middle_name;
          user.last_name = profile.last_name;
          user.birth_date = profile.birth_date;
          user.mobile = profile.mobile;
          user.nation_id = profile.nation_no;
          user.address = {
            street: profile.address_1,
            state: profile.address_2,
            province: profile.address_3,
            zip_code: profile.zip_code,
            country: profile.country_code
          };
        }
      }
      return user;
    });

    ctx.status = 200
    ctx.body = {
        status: 'SUCCESS',
        data: userProfile
    }
  } catch(err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = { status: 'ERROR', message: err.message || 'Error while getting tasks' };
  }
}

module.exports = {
  user
}