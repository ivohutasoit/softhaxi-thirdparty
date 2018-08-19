'use strict'

const { Model } = require('objection')
const database = require('../configurations/connection')['database']

Model.knex(database)

/**
 * User
 * 
 * @author Ivo Hutasoit <if09051@gmail.com>
 * @since 1.0.1
 */
class User extends Model {
  static get tableName() { return 'users' }
}

module.exports = User