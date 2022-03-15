import fastify from 'fastify';
import os from 'os';
import pino from 'pino';
import { fromEnv } from '@utils';
import { NOT_FOUND, INTERNAL_SERVER_ERROR } from '@lib/errors';


//IMPORT MODULES
import FsCors from 'fastify-cors';
import FsHelmet from 'fastify-helmet';
import FsSwagger from 'fastify-swagger';
import XConfig from '@config/_core';
import XModAuthJWTVerify from '@lib/authentication/jwt/jwtAuthVerify';
import XModDBPostgres from '@connection/database/postgres';

const logsConfig = {
  formatters: {
    level (level) {
      return { level }
    }
  },
  timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
  level: fromEnv('LOG_LEVEL')
}

const logger = {
  development: {
    prettyPrint: {
      colorize: true,
      levelFirst: true,
      ignore: 'time,pid,hostname'
    },
    level: fromEnv('LOG_LEVEL')
  },
  staging: logsConfig,
  production: logsConfig
}

const build = async () => {
  const server = fastify({
    bodyLimit: 1048576 * 2,
    logger: pino(logger[fromEnv('NODE_ENV')]),
    http2: true,
    https: XConfig.get('/application/tlsOptions')
  });

  console.table(os.cpus());

  await server.register(FsCors, { origin: '*' })
  await server.register(FsHelmet, {
    contentSecurityPolicy: {
      directives: {
        baseUri: ['\'self\''],
        defaultSrc: ['\'self\''],
        scriptSrc: ['\'self\''],
        objectSrc: ['\'self\''],
        workerSrc: ['\'self\'', 'blob:'],
        frameSrc: ['\'self\''],
        formAction: ['\'self\''],
        upgradeInsecureRequests: []
      }
    }
  });

  // AUTHENTICATION
  await server.register(XModAuthJWTVerify, {
    name: 'authenticate-jwt-default',
    config: XConfig.get('/jwtAuthOptions/default'),
    validateMethod: 'none'
  });

  // DATABASE
  await server.register(XModDBPostgres,
  [
    {
      credential: XConfig.get('/databases/postgres/default'),
      info: {
        id: "DEFAULT",
        env: XConfig.get('/application/environtment')
      }
    },
    {
      credential: XConfig.get('/databases/postgres/second_db'),
      info: {
        id: "SECOND_DB",
        env: XConfig.get('/application/environtment')
      }
    }
  ])

  // DOCUMENTATION
  await server.register(FsSwagger, XConfig.get('/swagger'));

  //ROUTES
  await server.register(require('@api/v1/_core/routes'), { prefix: 'api/v1' })

  server.setNotFoundHandler((request, reply) => {
    server.log.debug(`Route not found: ${request.method}:${request.raw.url}`)

    reply.status(404).send({
      statusCode: 404,
      error: NOT_FOUND,
      message: `Route ${request.method}:${request.raw.url} not found`
    })
  })

  server.setErrorHandler((err, request, reply) => {
    server.log.debug(`Request url: ${request.raw.url}`)
    server.log.debug(`Payload: ${request.body}`)
    server.log.error(`Error occurred: ${err}`)

    const code = err.statusCode ?? 500

    reply.status(code).send({
      statusCode: code,
      error: err.name ?? INTERNAL_SERVER_ERROR,
      message: err.message ?? err
    })
  })

  return server
}

// implement inversion of control to make the code testable
module.exports = {
  build
}
