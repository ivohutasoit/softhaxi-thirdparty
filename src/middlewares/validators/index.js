'use strict'

const activation = require('./activation.validator');
const login = require('./login.validator');
const register = require('./register.validator');

module.exports = {
  activation, login, register
}