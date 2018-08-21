const path = require('path');
const _ = require('lodash');

const packageJson = require('../../package.json');
const environment = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const base = {
  /**
   * Root folder
   */
  root: path.normalize(path.resolve(__dirname, '../')),

  /**
   * Running environment
   */
  env: environment,

  /**
   * Application version
   */
  version: process.env.APP_VERSION || packageJson.version,

  /**
   * Environment 
   */
  debug: environment !== 'production',

  /**
   * Application name
   */
  name: process.env.APP_NAME || 'Softh Axi Third Party',

  /**
  * Application description
  */
  description: process.env.APP_DESC || packageJson.description,

  /**
   * Session Keys
   */
  keys: [ process.env.SESSION_KEY || 'hariliburnaikudarabucsfreetest'],

  /**
   * Secret Key
   */
  secret: process.env.RESTFUL_SECRET_KEY || 'W3arEtheCH4mpi0n'
};

const specific = {
  development: {
    /**
     * Running port
     */
    port: 3000,

    /**
     * Application name
     */
    name: process.env.APP_NAME || 'Softh Axi Third Party - Development',
  },
  test: {
    /**
     * Running port
     */
    port: 3001,

    /**
     * Application name
     */
    name: process.env.APP_NAME || 'Softh Axi Third Party - Test Realm',
  },
  staging: {
    /**
     * Running port
     */
    port: process.env.PORT || 3000,
  },
  production: {
    /**
     * Running port
     */
    port: process.env.PORT || 3000,
  }
};

module.exports = _.merge(base, specific[environment]);