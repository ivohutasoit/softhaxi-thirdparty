'use strict'

const access = require('./access.validator');
const activation = require('./activation.validator');
const login = require('./login.validator');
const register = require('./register.validator');

module.exports = {
  access, activation, login, register
}