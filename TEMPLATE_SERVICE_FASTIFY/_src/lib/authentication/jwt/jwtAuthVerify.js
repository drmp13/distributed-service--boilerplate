// 'use strict';
//
// exports.plugin = {
//   register: (server, options) => {
//     server.auth.strategy('jwt-auth', 'jwt', {
//         keys: {
//           key: options.key,
//           algorithms: options.algorithms
//         },
//         verify: options.verify,
//         validate: (artifacts, request, h) => {
//           try {
//             let decoded=artifacts.decoded.payload.userdata;
//             let username = decoded.username;
//
//             if (username!='') {
//               request.headers.userdata = {
//                 username: username
//               }
//               return {
//                   isValid: true
//               };
//             } else {
//               console.log('Invalid Credential');
//               return {
//                 isValid: false
//               };
//             }
//           } catch (error) {
//             return {
//               isValid: false
//             };
//           }
//         }
//     });
//   },
//   name: 'jwt-auth'
// };

const fastifyPlugin = require("fastify-plugin");

async function validateUser(validateMethod){
  switch(validateMethod){
    case 'none':
      return true;
      break;
    default:
      return false;
  }
}

module.exports = fastifyPlugin(async function(fastify, opts) {
  const customMessages = {
    badRequestErrorMessage: 'Format is Authorization: Bearer [token]',
    noAuthorizationInHeaderMessage: 'Autorization header is missing!',
    authorizationTokenExpiredMessage: 'Authorization token expired',
    // for the below message you can pass a sync function that must return a string as shown or a string
    authorizationTokenInvalid: (err) => {
      return `Authorization token is invalid: ${err.message}`
    }
  }

  fastify.register(require("fastify-jwt"), {
    secret: opts.config.key,
    verify: {
      allowedIss: opts.config.verify.iss,
      allowedAud: opts.config.verify.aud
    },
    messages: customMessages
  })

  fastify.decorate(opts.name, async function(request, reply, done) {
    try {
      const decodedToken = await request.jwtVerify();
      if(await validateUser(opts.validateMethod)){
        request.auth = {
          userdata : decodedToken.userdata,
          isAuthenticated: true
        };
      }else{
        request.auth = {
          isAuthenticated: false
        };
      }

      done()
    } catch (err) {
      reply.send(err)
      done()
    }
  });
})
