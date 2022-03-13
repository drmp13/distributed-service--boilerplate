'use strict';

const Confidence = require('confidence');
const Config = require('@config/_core');
const Meta = require('@config/meta');

const Fs = require('fs');
const Path = require('path');

// console.log(Fs.readFileSync(Path.join(__dirname, 'ssl/ca/ca.key'), 'utf8'))

let internals = {
    criteria: {
        env: process.env.NODE_ENV
    }
};

internals.manifest = {
    $meta: 'App manifest document',
    server: {
        host : '0.0.0.0',
        port: Config.get('/application/port'),
        tls: Config.get('/application/tlsOptions'),
        routes: {
          cors: {
            origin: Config.get('/application/allowedOrigin')
          }
        }
    },
    register: {
        plugins : [
        // Logging connector
        {
            plugin:  '@hapi/good',
            options: Config.get('/good')
        },
        // Static file and directory handlers
        {
            plugin: require('@hapi/inert')
        },
        {
            plugin: require('@hapi/vision')
        },
        // Swagger support
        {
            plugin: 'hapi-swagger',
            options: Config.get('/swagger')
        },
        /* ----------------- Authentication -------------- */
        // JWT
        {
            plugin: '@hapi/jwt',
        },
        {
            plugin:  '@authentication/jwt/jwtAuthVerify',
            options: Config.get('/jwtAuthOptions')
        },
        // API KEY - STATIC
        {
            plugin:  '@authentication/apikey/static/config',
            options: {
              schemeName: 'api-key-static'
            }
        },
        {
            plugin:  '@authentication/apikey/static/worker',
            options: {
              schemeName: 'api-key-static',
              pluginOptions: {
                strategyName: 'api-key-static--test',
                apiKeys: {
                  '1234': {
                    name: 'Global Mailer Account'
                  },
                  'abcd': {
                    name: 'Global Logger Account'
                  }
                }
              }
            }
        },
        // API KEY - DYNAMIC
        {
            plugin:  '@authentication/apikey/dynamic/config'
        },
        {
            plugin:  '@authentication/apikey/dynamic/mailer/mail-api-key-db'
        },
        /* ----------------- Databases -------------- */
        //PostgreSQL
        {
            plugin : '@connection/database/postgres',
            options: [
                      {
                        credential: Config.get('/databases/postgres/default'),
                        info: {
                          id: "DEFAULT",
                          env: Config.get('/application/environtment')
                        }
                      },
                      {
                        credential: Config.get('/databases/postgres/second_db'),
                        info: {
                          id: "SECOND_DB",
                          env: Config.get('/application/environtment')
                        }
                      }
                    ]
        },
        //MongoDB
        {
            plugin : '@connection/database/mongodb',
            options: [
                      {
                        credential: Config.get('/databases/mongodb/default'),
                        info: {
                          id: "DEFAULT",
                          env: Config.get('/application/environtment')
                        }
                      }
                    ]
        },
        /* ----------------- Message Broker -------------- */
        //RabbitMQ
        {
            plugin : '@connection/message_broker/rabbitmq/subcriber',
            options: [
                      {
                        credential: Config.get('/message_broker/rabbitmq/default'),
                        info: {
                          id: "DEFAULT",
                          env: Config.get('/application/environtment')
                        }
                      }
                    ]
        },
        /* ----------------- Mailer -------------- */
        {
            plugin: '@lib/mailer/sender',
            options: Config.get('/email')
        },
        /* ----------------- Routers -------------- */
        {
            plugin: '@modules/_core/routes'
        },
        {
            plugin: '@modules/authentication/routes'
        },
        {
            plugin: '@modules/message_broker/routes'
        },
        {
            plugin: '@modules/mailer/v1/routes'
        }
      ]
    }
};

internals.store = new Confidence.Store(internals.manifest);

exports.get = function(key) {
    return internals.store.get(key, internals.criteria);
};

exports.meta = function(key) {
    return internals.store.meta(key, internals.criteria);
};
