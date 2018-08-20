'use strict'

const { Model } = require('objection')
const database = require('../configurations/connection')['database']

Model.knex(database)

/**
 * Profile
 * 
 * @author Ivo Hutasoit <if09051@gmail.com>
 * @since 1.0.1
 */
class Profile extends Model {
  static get tableName() { return 'profiles'; }

  async $beforeUpdate() {
    this.updated_at = database.fn.now();
  }
}

module.exports = Profile