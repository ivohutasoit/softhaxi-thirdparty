'use strict'

const connection = require('../configurations/connection')

const database = connection['database']

/**
 * @deprecated since version 1.1.0
 * @param {String} id 
 */
function findById(id) {
  return database('profiles').where({ id }).first().catch((error) => { throw error })
}

/**
 * @deprecated since version 1.1.0
 * @param {Object} profileData 
 */
function create(profileData) {
  return database('profiles').insert(profileData).then((data) => {
    if(!data) throw new Error('Unable to create user profile')
    return findById(profileData.id)
  }).catch((error) => { throw error })
}

/**
 * @deprecated since version 1.1.0
 */
module.exports = {
  findById,
  create
}