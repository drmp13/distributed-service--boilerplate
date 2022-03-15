import FastifyPlugin from 'fastify-plugin';

async function validateUser(validateMethod: string){
  switch(validateMethod){
    case 'none':
      return true;
      break;
    default:
      return false;
  }
}

module.exports = FastifyPlugin(async function(fastify, opts) {
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
