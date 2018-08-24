'use strict' 

const lodash = require('lodash')
const { User, Profile } = require('../models');

/**
 * 
 * @param {Object} account contains user and profile. 
 *        account = { user: any, profile: any }
 */
async function registerAccount(account) {
  return Promise(async(resolve, reject) => {
    const user = await User.query().insert(account.user);

    if(user) {
      const profile = await Profile.query().insert(account.profile);
    
      if(profile) {
        userProfile = lodash.merge(user, profile);
        resolve(userProfile)
      } else {
        reject()
      }
    }
  });
}

module.exports = {
  registerAccount
}