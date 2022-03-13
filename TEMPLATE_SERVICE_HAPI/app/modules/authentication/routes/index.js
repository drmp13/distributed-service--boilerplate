'use strict';

const Joi = require('joi');

exports.plugin = {
    pkg: require('@root/package.json'),
    name : 'authentication_routes',
    register: async (server, options) => {
        const Controllers = {
            default: require('@modules/authentication/controllers')
        };
        server.route([
            {
                method: 'POST',
                path: '/v1/auth/jwt',
                options: {
                  tags: ['api','/v1/auth/jwt'],
                  description: 'Auth with DUMMY to get JWT.',
                  notes: [],
                  plugins: {
                      'hapi-swagger': {
                          order: 1
                      }
                  },
                  validate: {
                      payload: Joi.object({
                        username: Joi.string().required().description('Username.').default('tester'),
                        password: Joi.string().required().description('Password.').default('tester')
                      }).label('Authentication Payload')
                  },
                  handler: Controllers.default.login
                }
            },
            {
                method: 'GET',
                path: '/v1/auth/jwt/test',
                options: {
                  tags: ['api','/v1/auth/jwt'],
                  description: 'Test Authentication with JWT',
                  notes: [],
                  plugins: {
                      'hapi-swagger': {
                          order: 2
                      }
                  },
                  auth: 'jwt-auth',
                  validate: {
                    headers: Joi.object({
                      authorization: Joi.string().default('Bearer ')
                    }).options({ allowUnknown: true })
                  },
                  handler: Controllers.default.test
                }
            },
            {
                method: 'GET',
                path: '/v1/auth/api-key-static-test',
                options: {
                  tags: ['api','/v1/auth/api-key-static-test'],
                  description: 'Test Authentication with Static API Key',
                  notes: [],
                  plugins: {
                      'hapi-swagger': {
                          order: 3
                      }
                  },
                  auth: 'api-key-static--test',
                  validate: {
                    headers: Joi.object({
                      'x-api-key': Joi.string()
                    }).options({ allowUnknown: true }).default('1234').label('API Key'),
                  },
                  handler: Controllers.default.test
                }
            }
        ]);
    }
};
