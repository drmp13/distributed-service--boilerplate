import Controllers from './controllers';
const apiRoutes = async (app, options) => {
  app.route({
    method: 'POST',
    url: '/',
    schema: {
      tags: ['v1'],
      summary: 'Login Route',
      description: 'Login to get JWT',
      body: {
        required: ['username','password'],
        type: 'object',
        properties: {
          username: { type: 'string', example: 'tester' },
          password: { type: 'string', example: 'tester' }
        }
      },
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
    handler: Controllers.login
  });

  app.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['v1'],
      summary: 'Login Route',
      description: 'Test Authentication with JWT',
      headers: {
        required: ['authorization'],
        type: 'object',
        properties: {
          authorization: { type: 'string', example: 'Bearer ' }
        }
      },
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
    preHandler: app['authenticate-jwt-default'],
    handler: Controllers.test
  });
}


module.exports = apiRoutes
