'use strict'

const connection = require('../configurations/connection')

const database = connection['database']

function findById(id) {
  return database('profiles').where({ id }).first().catch((error) => { throw error })
}

function create(profileData) {
  return database('profiles').insert(profileData).then((data) => {
    if(!data) throw new Error('Unable to create user profile')
    return findById(profileData.id)
  }).catch((error) => { throw error })
}


module.exports = {
  findById,
  create
}