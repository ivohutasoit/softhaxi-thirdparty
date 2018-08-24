'use strict'

const Activation = require('./activation.controller');
const Authentication = require('./auth.controller');
const Profile = require('./profile.controller');
const User = require('./user.controller');

/**
 * @since 1.1.0
 */
module.exports = {
  Activation,
  Authentication,
  Profile,
  User
}