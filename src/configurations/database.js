'use strict'

const path = require('path')

const base = path.resolve(__dirname, '../../','database')

module.exports = {

    test: {
        client: 'sqlite3',
        connection: {
          filename: '../dbtest.sqlite3'
        },
        migrations: {
          directory: path.resolve(base, 'migrations'),
          tableName: 'migrations'
        },
        seeds: {
          directory: path.resolve(base, 'seeds')
        },
        useNullAsDefault: true
      },
    
      development: {
        client: 'sqlite3',
        connection: {
          filename: '../dbdev.sqlite3'
        },
        migrations: {
          directory: path.resolve(base, 'migrations'),
          tableName: 'migrations'
        },
        seeds: {
          directory: path.resolve(base, 'seeds')
        },
        useNullAsDefault: true
      },
  
    staging: {
      client: 'postgresql',
      connection: {
        host: process.env.DB_SERVER || 'localhost',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || 'dbstag',
        user: process.env.DB_USERNAME || 'username',
        password: process.env.DB_PASSWORD || 'password',
        ssl: true
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        directory: path.resolve(base, 'migrations'),
        tableName: 'migrations'
      },
      seeds: {
        directory: path.resolve(base, 'seeds')
      }
    },
  
    production: {
      client: 'postgresql',
      connection: {
        host: process.env.DB_SERVER || 'localhost',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || 'dbprod',
        user: process.env.DB_USERNAME || 'username',
        password: process.env.DB_PASSWORD || 'password',
        ssl: true
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        directory: path.resolve(base, 'migrations'),
        tableName: 'migrations'
      },
      seeds: {
        directory: path.resolve(base, 'seeds')
      }
    }
  
  };
  