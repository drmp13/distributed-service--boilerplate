const apiRoutes = async (app, options) => {
  app.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['v1'],
      summary: 'Base Route',
      description: 'v1 API base route',
      response: {
        default: {
          description: 'Default response',
          type: 'object',
          properties: {
            statusCode: { type: 'number', default: 200 },
            message: { type: 'string', default: 'Success' }
          }
        }
      }
    },
    handler: async function handler(request, reply) {
      reply.code(200).send({
        statusCode: 200,
        message: 'API v1 base route'
      });
    }
  });

  app.register(require('../../modules/authentication/routes'), { prefix: '/auth' });


}

module.exports = apiRoutes
