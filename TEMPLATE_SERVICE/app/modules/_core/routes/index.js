const Joi = require('joi');
exports.plugin = {
    pkg: require('@root/package.json'),
    name : 'core_routes',
    register: async (server, options) => {
        server.route([
            {
                method: 'GET',
                path: '/',
                options: {
                  tags: ['api','/'],
                  description: 'Base route',
                  notes: [],
                  plugins: {
                      'hapi-swagger': {
                          order: 1
                      }
                  },
                  description: 'Base route.',
                  handler: async (request, h) => {
                    return {
                      statusCode: 200,
                      message: "Hello"
                    };
                  }
                }
            }
        ]);
    }
};
