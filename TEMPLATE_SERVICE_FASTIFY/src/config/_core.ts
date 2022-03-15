'use strict';

import Confidence from 'confidence';
import Fs from 'fs';
import Path from 'path';
import Pack from '@root/package';
import { fromEnv, terminate } from '@utils';

// Confidence criteria
let internals = {
    criteria: {
        env: fromEnv('NODE_ENV')
    }
};

// Variable for Config
let email_template_path = '/usr/src/app/lib/mailer/template';

//  Confidence document object
internals.config = {
    $meta: 'App configuration file',
    /* ----------------- Application -------------- */
    application: {
        environtment: {
            $filter: 'env',
            production: "Production",
            test: "Testing",
            development: "Development",
            $default: "Development"
        },
        port: {
            $filter: 'env',
            production: fromEnv('PORT'),
            test: 7000,
            development: fromEnv('PORT'),
            $default: fromEnv('PORT')
        },
        allowedOrigin: {
            $filter: 'env',
            production: ["*"],
            test: ["*"],
            development: ["*"],
            $default: ["*"]
        },
        tlsOptions: {
          allowHTTP1: true,
          key: Fs.readFileSync(Path.join('/usr/src/app/certificate/ssl/key.pem'), 'utf8'),
          cert: Fs.readFileSync(Path.join('/usr/src/app/certificate/ssl/cert.pem'), 'utf8')
        },
        hostExpose: fromEnv('EXPOSE_URL'),
        portExpose: fromEnv('EXPOSE_PORT'),
        baseUrl: `${fromEnv('EXPOSE_PROTOCOL')}://${fromEnv('EXPOSE_URL')}${fromEnv('EXPOSE_PORT')}`
    },
    /* ----------------- Databases -------------- */
    databases: {
      postgres: {
          default: {
            $filter: 'env',
            production: {
              host: fromEnv('DATABASE_PG__DEFAULT__HOST'),
              port: fromEnv('DATABASE_PG__GLOBAL__PORT'),
              username: fromEnv('DATABASE_PG__DEFAULT__USER'),
              password: fromEnv('DATABASE_PG__DEFAULT__PASS'),
              database: fromEnv('DATABASE_PG__DEFAULT__DB')
            },
            test: {
              host: fromEnv('DATABASE_PG__DEFAULT__HOST'),
              port: fromEnv('DATABASE_PG__GLOBAL__PORT'),
              username: fromEnv('DATABASE_PG__DEFAULT__USER'),
              password: fromEnv('DATABASE_PG__DEFAULT__PASS'),
              database: fromEnv('DATABASE_PG__DEFAULT__DB')
            },
            development: {
              host: fromEnv('DATABASE_PG__DEFAULT__HOST'),
              port: fromEnv('DATABASE_PG__GLOBAL__PORT'),
              username: fromEnv('DATABASE_PG__DEFAULT__USER'),
              password: fromEnv('DATABASE_PG__DEFAULT__PASS'),
              database: fromEnv('DATABASE_PG__DEFAULT__DB')
            },
            $default: {
              host: fromEnv('DATABASE_PG__DEFAULT__HOST'),
              port: fromEnv('DATABASE_PG__GLOBAL__PORT'),
              username: fromEnv('DATABASE_PG__DEFAULT__USER'),
              password: fromEnv('DATABASE_PG__DEFAULT__PASS'),
              database: fromEnv('DATABASE_PG__DEFAULT__DB')
            }
          },
          second_db: {
            $filter: 'env',
            production: {
              host: fromEnv('DATABASE_PG__SECOND__HOST'),
              port: fromEnv('DATABASE_PG__GLOBAL__PORT'),
              username: fromEnv('DATABASE_PG__SECOND__USER'),
              password: fromEnv('DATABASE_PG__SECOND__PASS'),
              database: fromEnv('DATABASE_PG__SECOND__DB')
            },
            test: {
              host: fromEnv('DATABASE_PG__SECOND__HOST'),
              port: fromEnv('DATABASE_PG__GLOBAL__PORT'),
              username: fromEnv('DATABASE_PG__SECOND__USER'),
              password: fromEnv('DATABASE_PG__SECOND__PASS'),
              database: fromEnv('DATABASE_PG__SECOND__DB')
            },
            development: {
              host: fromEnv('DATABASE_PG__SECOND__HOST'),
              port: fromEnv('DATABASE_PG__GLOBAL__PORT'),
              username: fromEnv('DATABASE_PG__SECOND__USER'),
              password: fromEnv('DATABASE_PG__SECOND__PASS'),
              database: fromEnv('DATABASE_PG__SECOND__DB')
            },
            $default: {
              host: fromEnv('DATABASE_PG__SECOND__HOST'),
              port: fromEnv('DATABASE_PG__GLOBAL__PORT'),
              username: fromEnv('DATABASE_PG__SECOND__USER'),
              password: fromEnv('DATABASE_PG__SECOND__PASS'),
              database: fromEnv('DATABASE_PG__SECOND__DB')
            }
          }
      },
      mongodb: {
          default: {
            $filter: 'env',
            production: {
              host: fromEnv('DATABASE_MONGO__MAILER__HOST'),
              port: fromEnv('DATABASE_MONGO__GLOBAL__PORT'),
              username: fromEnv('DATABASE_MONGO__MAILER__USER'),
              password: fromEnv('DATABASE_MONGO__MAILER__PASS'),
              database: fromEnv('DATABASE_MONGO__MAILER__DB')
            },
            test: {
              host: fromEnv('DATABASE_MONGO__MAILER__HOST'),
              port: fromEnv('DATABASE_MONGO__GLOBAL__PORT'),
              username: fromEnv('DATABASE_MONGO__MAILER__USER'),
              password: fromEnv('DATABASE_MONGO__MAILER__PASS'),
              database: fromEnv('DATABASE_MONGO__MAILER__DB')
            },
            development: {
              host: fromEnv('DATABASE_MONGO__MAILER__HOST'),
              port: fromEnv('DATABASE_MONGO__GLOBAL__PORT'),
              username: fromEnv('DATABASE_MONGO__MAILER__USER'),
              password: fromEnv('DATABASE_MONGO__MAILER__PASS'),
              database: fromEnv('DATABASE_MONGO__MAILER__DB')
            },
            $default: {
              host: fromEnv('DATABASE_MONGO__MAILER__HOST'),
              port: fromEnv('DATABASE_MONGO__GLOBAL__PORT'),
              username: fromEnv('DATABASE_MONGO__MAILER__USER'),
              password: fromEnv('DATABASE_MONGO__MAILER__PASS'),
              database: fromEnv('DATABASE_MONGO__MAILER__DB')
            }
          }
      }
    },
    /* ----------------- Message Broker -------------- */
    message_broker: {
      rabbitmq: {
          default: {
            $filter: 'env',
            production: {
              host: fromEnv('MESSAGE_BROKER__HOST'),
              port: fromEnv('MESSAGE_BROKER__PORT'),
              username: fromEnv('MESSAGE_BROKER__USER'),
              password: fromEnv('MESSAGE_BROKER__PASS'),
              workspace: {
                subcribes: [{
                  callback: "consumer",
                  queue: 'queueTesting'
                },
                {
                  callback: "consumer2",
                  queue: 'queueTesting2'
                }]
              }
            },
            $default: {
              host: fromEnv('MESSAGE_BROKER__HOST'),
              port: fromEnv('MESSAGE_BROKER__PORT'),
              username: fromEnv('MESSAGE_BROKER__USER'),
              password: fromEnv('MESSAGE_BROKER__PASS'),
              workspace: {
                subcribes: [{
                  callback: "consumer",
                  queue: 'queueTesting'
                },
                {
                  callback: "consumer2",
                  queue: 'queueTesting2'
                }]
              }
            }
          }
      }
    },
    /* ----------------- Email -------------- */
    email: {
      account: {
        default: {
          smtp_address : "smtp.gmail.com",
          smtp_port : 587,
          smtp_secure: false,
          email: "",
          alias: "",
          password : ""
        }
      },
      type: {
        test: {
          account: "default",
          template: null
        },
        test_template: {
          account: "default",
          template: {
            path: `${email_template_path}/test.html`,
            propeties: ['test','test2']
          }
        }
      }
    },
    /* ----------------- Authentication -------------- */
    // authCookie: {
    //     cookieSecret: process.env.COOKIE_SECRET,
    //     cookieName: 'Basic-auth'
    // },
    // yarCookie: {
    //     storeBlank: false,
    //     cookieOptions: {
    //         password: process.env.YAR_COOKIE_SECRET,
    //         isSecure: false
    //     }
    // },
    jwtAuthOptions: {
      default: {
        key: fromEnv('JWT_SECRET'),
        algorithm: 'HS256',
        verify: { // set to 'false' if u want to disable verification
          aud: 'urn:audience:test',
          iss: 'urn:issuer:test',
          sub: false,
          //nbf: 1, //not valid before
          //exp: 2, //is have expired
          //maxAgeSec: 0,
          //timeSkewSec: 15 //Integer to adust exp and maxAgeSec to account for server time drift in seconds
        }
      }
    },
    /* ----------------- API Documentation -------------- */
    swagger: {
      routePrefix: '/documentation',
      mode: 'dynamic',
      swagger: {
        info: {
                title: Pack.name,
                version: Pack.version,
                description: Pack.description,
                contact: {
                        name: Pack.maintainers[0].name,
                        email: Pack.maintainers[0].email,
                        url: Pack.maintainers[0].url
                }
        },
        grouping: 'tags',
        host: `${fromEnv('EXPOSE_URL')}:${fromEnv('EXPOSE_PORT')}`,
        schemes: ['https'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
          { name: 'v1', description: 'v1 Routes' },
        ],
      },
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false
      },
      uiHooks: {
        onRequest: function (request, reply, next) { next() },
        preHandler: function (request, reply, next) { next() }
      },
      staticCSP: true,
      transformStaticCSP: (header) => header,
      exposeRoute: true
    }
};

internals.store = new Confidence.Store(internals.config);

exports.get = function(key) {
    return internals.store.get(key, internals.criteria);
};

exports.meta = function(key) {
    return internals.store.meta(key, internals.criteria);
};
