'use strict'

const connection = require('../configurations/connection')

const database = connection['database']

/**
 * 
 */
function list() {
  return database('users').select().catch((error) => { throw error })
}

/**
 * 
 * @param {String} id 
 */
function findById(id) {
  return database('users').where({ id: id, is_deleted: false }).first().catch((error) => { throw error })
}

/**
 * 
 * @param {String} username 
 */
function findByUsername(username) {
  return database('users').where({ username: username, is_deleted: false }).first().catch((error) => { throw error })
}

/**
 * 
 * @param {String} email 
 */
function findByEmail(email) {
  return database('users').where({ email: email, is_deleted: false }).first().catch((error) => { throw error })
}

/**
 * 
 * @param {Object} userData 
 */
function create(userData) {
  return database('users').insert(userData).then((data) => {
    if(!data) throw new Error('Unable to create user')
    return findById(userData.id)
  }).catch((error) => { throw error })
}

/**
 * 
 * @param {Object} tokenData 
 */
function activate(tokenData) {
  return database('users').where({ email: tokenData.email.toLowerCase(), activation_code: tokenData.token, is_active: false })
    .first().then((user) => {
      if(!user) return null //throw new Error('User not exist')

      return database('users').where({ id: user.id })
        .update({ is_active: true, activation_code: null, updated_by: user.id, updated_at: database.fn.now() })
        .then((data) => {
          if(!data) throw new Error('Failed to activate user')

          return findById(user.id)
        }).catch((error) => { throw error })
    }).catch((error) => { throw error })
}

module.exports = {
  list, findById, findByUsername, findByEmail,
  create
}