'use strict';
const Boom = require('@hapi/boom');
const Hoek = require('@hapi/hoek');

const headerKey = 'x-api-key';

const register = (server, pluginOptions) => {
  server.auth.scheme('api-key-dynamic', (authServer, options) => {

    return {
      authenticate: async(request, h) => {
        // check in both the query params and the X-API-KEY header for an api key:
        const apiKey = request.headers['x-api-key']

        try {
          // if they are valid then continue processing:
          const validate = options.apiKeyValidation(apiKey);
          const credentials = validate.userdata
          if (validate.status===true) {
            request.headers.userdata = credentials
            return h.authenticated({ credentials });
          }
          // otherwise always return a 401:
        } catch (err) {
          // does not have to do anything
        }
        throw Boom.unauthorized('Invalid API Key.');
      }
    };
  });
  /* will call server.auth.strategy
   package should be of the form:
   strategy: {
    name: 'myStrategyName',
    mode: true // (can be any valid strategy mode)
    apiKeys: {
      'anAPIKey': {
        name: 'authenticationName'
      }
    ]
   }
  */
  if (pluginOptions.strategy) {
    server.auth.strategy(pluginOptions.strategy.name,
      pluginOptions.schemeName,
      pluginOptions.strategy);
  }
};

exports.plugin = {
  register,
  once: true,
  name : `api-key-dynamic`,
  pkg: require('@root/package.json')
};
