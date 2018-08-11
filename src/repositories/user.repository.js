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
  return database('users').where({ id }).first().catch((error) => { throw error })
}

/**
 * 
 * @param {String} username 
 */
function findByUsername(username) {
  return database('users').where({ username: username }).first().catch((error) => { throw error })
}

module.exports = {
  list, findById, findByUsername
}