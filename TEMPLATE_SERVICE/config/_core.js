'use strict';

const Confidence = require('confidence');
const Fs = require('fs');
const Path = require('path');
const Pack = require('@root/package');

// Confidence criteria
let internals = {
    criteria: {
        env: process.env.NODE_ENV
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
            production: process.env.PORT,
            test: 7000,
            development: process.env.PORT,
            $default: process.env.PORT
        },
        allowedOrigin: {
            $filter: 'env',
            production: ["*"],
            test: ["*"],
            development: ["*"],
            $default: ["*"]
        },
        hostExpose: process.env.EXPOSE_URL,
        portExpose: process.env.EXPOSE_PORT,
        baseUrl: process.env.EXPOSE_PROTOCOL+'://'+process.env.EXPOSE_URL+':'+process.env.EXPOSE_PORT
    },
    // tlsOptions: {
    //     key: Fs.readFileSync(Path.join(__dirname, 'ssl/key.pem'), 'utf8'),
    //     cert: Fs.readFileSync(Path.join(__dirname, 'ssl/cert.pem'), 'utf8')
    // },
    /* ----------------- Databases -------------- */
    databases: {
      postgres: {
          default: {
            $filter: 'env',
            production: {
              host: process.env.DATABASE_PG__DEFAULT__HOST,
              port: process.env.DATABASE_PG__GLOBAL__PORT,
              username: process.env.DATABASE_PG__DEFAULT__USER,
              password: process.env.DATABASE_PG__DEFAULT__PASS,
              database: process.env.DATABASE_PG__DEFAULT__DB
            },
            test: {
              host: process.env.DATABASE_PG__DEFAULT__HOST,
              port: process.env.DATABASE_PG__GLOBAL__PORT,
              username: process.env.DATABASE_PG__DEFAULT__USER,
              password: process.env.DATABASE_PG__DEFAULT__PASS,
              database: process.env.DATABASE_PG__DEFAULT__DB
            },
            development: {
              host: process.env.DATABASE_PG__DEFAULT__HOST,
              port: process.env.DATABASE_PG__GLOBAL__PORT,
              username: process.env.DATABASE_PG__DEFAULT__USER,
              password: process.env.DATABASE_PG__DEFAULT__PASS,
              database: process.env.DATABASE_PG__DEFAULT__DB
            },
            $default: {
              host: process.env.DATABASE_PG__DEFAULT__HOST,
              port: process.env.DATABASE_PG__GLOBAL__PORT,
              username: process.env.DATABASE_PG__DEFAULT__USER,
              password: process.env.DATABASE_PG__DEFAULT__PASS,
              database: process.env.DATABASE_PG__DEFAULT__DB
            }
          },
          second_db: {
            $filter: 'env',
            production: {
              host: process.env.DATABASE_PG__SECOND__HOST,
              port: process.env.DATABASE_PG__GLOBAL__PORT,
              username: process.env.DATABASE_PG__SECOND__USER,
              password: process.env.DATABASE_PG__SECOND__PASS,
              database: process.env.DATABASE_PG__SECOND__DB
            },
            test: {
              host: process.env.DATABASE_PG__SECOND__HOST,
              port: process.env.DATABASE_PG__GLOBAL__PORT,
              username: process.env.DATABASE_PG__SECOND__USER,
              password: process.env.DATABASE_PG__SECOND__PASS,
              database: process.env.DATABASE_PG__SECOND__DB
            },
            development: {
              host: process.env.DATABASE_PG__SECOND__HOST,
              port: process.env.DATABASE_PG__GLOBAL__PORT,
              username: process.env.DATABASE_PG__SECOND__USER,
              password: process.env.DATABASE_PG__SECOND__PASS,
              database: process.env.DATABASE_PG__SECOND__DB
            },
            $default: {
              host: process.env.DATABASE_PG__SECOND__HOST,
              port: process.env.DATABASE_PG__GLOBAL__PORT,
              username: process.env.DATABASE_PG__SECOND__USER,
              password: process.env.DATABASE_PG__SECOND__PASS,
              database: process.env.DATABASE_PG__SECOND__DB
            }
          }
      },
      mongodb: {
          default: {
            $filter: 'env',
            production: {
              host: process.env.DATABASE_MONGO__MAILER__HOST,
              port: process.env.DATABASE_MONGO__GLOBAL__PORT,
              username: process.env.DATABASE_MONGO__MAILER__USER,
              password: process.env.DATABASE_MONGO__MAILER__PASS,
              database: process.env.DATABASE_MONGO__MAILER__DB
            },
            test: {
              host: process.env.DATABASE_MONGO__MAILER__HOST,
              port: process.env.DATABASE_MONGO__GLOBAL__PORT,
              username: process.env.DATABASE_MONGO__MAILER__USER,
              password: process.env.DATABASE_MONGO__MAILER__PASS,
              database: process.env.DATABASE_MONGO__MAILER__DB
            },
            development: {
              host: process.env.DATABASE_MONGO__MAILER__HOST,
              port: process.env.DATABASE_MONGO__GLOBAL__PORT,
              username: process.env.DATABASE_MONGO__MAILER__USER,
              password: process.env.DATABASE_MONGO__MAILER__PASS,
              database: process.env.DATABASE_MONGO__MAILER__DB
            },
            $default: {
              host: process.env.DATABASE_MONGO__MAILER__HOST,
              port: process.env.DATABASE_MONGO__GLOBAL__PORT,
              username: process.env.DATABASE_MONGO__MAILER__USER,
              password: process.env.DATABASE_MONGO__MAILER__PASS,
              database: process.env.DATABASE_MONGO__MAILER__DB
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
              host: process.env.MESSAGE_BROKER__HOST,
              port: process.env.MESSAGE_BROKER__PORT,
              username: process.env.MESSAGE_BROKER__USER,
              password: process.env.MESSAGE_BROKER__PASS,
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
              host: process.env.MESSAGE_BROKER__HOST,
              port: process.env.MESSAGE_BROKER__PORT,
              username: process.env.MESSAGE_BROKER__USER,
              password: process.env.MESSAGE_BROKER__PASS,
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
      key: process.env.JWT_SECRET,
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
    },
    /* ----------------- API Documentation -------------- */
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
        schemes: ['http','https'],
        host: process.env.EXPOSE_URL+':'+process.env.EXPOSE_PORT,
        sortEndpoints: 'ordered',
        // securityDefinitions: {
        //     'jwt': {
        //         'type': 'apiKey',
        //         'name': 'Authorization',
        //         'in': 'header'
        //     }
        // },
        // security: [{ 'jwt': [] }]
    },
    /* ----------------- Logging -------------- */
    good: {
        ops: {
            interval: 1000
        },
        reporters: {
            myConsoleReporter:
            [
                {
                    module: '@hapi/good-squeeze',
                    name: 'Squeeze',
                    args: [{ log: '*', response: '*' }]
                },
                {
                    module: '@hapi/good-console'
                }, 'stdout'
            ],
            // myFileReporter:
            // [
            //     {
            //         module: '@hapi/good-squeeze',
            //         name: 'Squeeze',
            //         args: [{ error: '*', response: '*',log : '*',  request: '*' }]
            //     },
            //     {
            //         module: '@hapi/good-squeeze',
            //         name: 'SafeJson'
            //     },
            //     {
            //         module: '@hapi/good-file',
            //         args: ['./logs/log']
            //     }
            // ],
            // myHTTPReporter:
            // [
            //     {
            //         module: '@hapi/good-squeeze',
            //         name: 'Squeeze',
            //         args: [
            //                 { error: '*' }
            //         ]
            //     },
            //     {
            //         module: '@hapi/good-http',
            //         args: ['http://localhost:8000/logs',
            //             {
            //                 wreck: {
            //                     headers: { 'x-api-key': 12345 }
            //                 }
            //             }
            //         ]
            //     }
            // ]
        }
    }
};

internals.store = new Confidence.Store(internals.config);

exports.get = function(key) {
    return internals.store.get(key, internals.criteria);
};

exports.meta = function(key) {
    return internals.store.meta(key, internals.criteria);
};
