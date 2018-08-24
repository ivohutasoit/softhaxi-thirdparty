'use strict'

const database = require('../configurations/connection')['database']

/**
 * @deprecated since version 1.1.0
 */
function list() {
  return database('users').where({ hv_admin: false, is_deleted: false })
    .select('id', 'username', 'email', 'mobile', 'is_active', 'activation_code', 'created_at')
    .catch((error) => { throw error })
}

/**
 * @deprecated since version 1.1.0
 * @param {String} id 
 */
function findById(id) {
  return database('users').where({ id: id, is_deleted: false }).first().catch((error) => { throw error })
}

/**
 * @deprecated since version 1.1.0
 * @param {String} username 
 */
function findByUsername(username) {
  return database('users').where({ username: username, is_deleted: false }).first().catch((error) => { throw error })
}

/**
 * @deprecated since version 1.1.0
 * @param {String} email 
 */
function findByEmail(email) {
  return database('users').where({ email: email, is_deleted: false }).first().catch((error) => { throw error })
}

/**
 * @deprecated since version 1.1.0
 * @param {Object} userData 
 */
function create(userData) {
  return database('users').insert(userData).then((data) => {
    if(!data) throw new Error('Unable to create user')
    return findById(userData.id)
  }).catch((error) => { throw error })
}

/**
 * @deprecated since version 1.1.0
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

/**
 * @deprecated since version 1.1.0
 */
module.exports = {
  list, findById, findByUsername, findByEmail,
  create, activate
}