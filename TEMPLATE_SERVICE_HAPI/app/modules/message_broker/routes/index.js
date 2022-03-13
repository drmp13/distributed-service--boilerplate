'use strict';

const Joi = require('joi');

exports.plugin = {
    pkg: require('@root/package.json'),
    name : 'broker_routes',
    register: async (server, options) => {
        server.route([
            {
                method: 'POST',
                path: '/v1/message_broker/test',
                options: {
                  tags: ['api','/v1/message_broker/test'],
                  description: 'Publish Test Message Broker',
                  notes: [],
                  plugins: {
                      'hapi-swagger': {
                          order: 1
                      }
                  },
                  validate: {
                      payload: Joi.object({"Key":"Value"}).label('Payload')
                  },
                  handler: async (request, h) => {
                    const payload = Object.assign({},request.payload);
                    const Config = require('@config/_core');
                    const publisher = require("@connection/message_broker/rabbitmq/publisher");
                    const publisher_credential = Config.get('/message_broker/rabbitmq/default');
                    const publisher_config = {
                      queue: 'queueTesting'
                    }
                    const response = await publisher.publish(publisher_credential,publisher_config,payload)

                    return {
                      statusCode: 200,
                      message: response
                    };
                  }
                }
            }
        ]);
    }
};
