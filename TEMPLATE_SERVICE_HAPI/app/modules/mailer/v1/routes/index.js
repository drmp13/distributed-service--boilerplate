'use strict';

const Joi = require('joi');

exports.plugin = {
    pkg: require('@root/package.json'),
    name : 'mailer_v1_routes',
    register: async (server, options) => {
        const Controllers = {
            default: require('@modules/mailer/v1/controllers')
        };
        server.route([
            {
                method: 'POST',
                path: '/v1/mailer',
                options: {
                  tags: ['api','/v1/mailer'],
                  description: 'Send email.',
                  notes: [],
                  plugins: {
                      'hapi-swagger': {
                          order: 1
                      }
                  },
                  validate: {
                    payload: Joi.object({
                      type: Joi.string().required().default('test_template'),
                      mail_propeties: Joi.object({
                        subject: Joi.string().min(5).example('This is mail subject'),
                        receiver: Joi.array().items(Joi.object({
                          email: Joi.string().email({ tlds: { allow: false } }).required().example('example@gmail.com'),
                          alias: Joi.string().default('Example Name')
                        })).required().min(1),
                        cc: Joi.array().items(Joi.object({
                          email: Joi.string().email({ tlds: { allow: false } }).required().example('example@gmail.com'),
                          alias: Joi.string().default('Example Name')
                        })).required().min(0),
                        bcc: Joi.array().items(Joi.object({
                          email: Joi.string().email({ tlds: { allow: false } }).required().example('example@gmail.com'),
                          alias: Joi.string().example('Example Name')
                        })).required().min(0),
                        attachment: Joi.array().items(Joi.string().example('/documents/example.pdf')).required().min(0),
                        content: Joi.object().required()
                      })

                    }).label('Email Content')
                  },
                  handler: Controllers.default.sendMail
                }
            }
        ]);
    }
};
