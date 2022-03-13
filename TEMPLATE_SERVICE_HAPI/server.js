'use strict';
const apm = require('elastic-apm-node').start({
  // serviceName: '',
  serverUrl: process.env.ELK_STACK_APM_SERVER_URL,
  verifyServerCert: false,
  serverCaCertFile: '/usr/src/app/'+process.env.ELK_STACK_CA_CERT_PATH,
  secretToken: process.env.ELK_STACK_ELASTIC_TOKEN,
  // apiKey: '',
  // active: process.env.NODE_ENV === 'production'
});




require('module-alias/register');
const Hapi = require('@hapi/hapi');
const Glue = require('@hapi/glue');

const os = require("os")

const Manifest = require('@config/manifest');
const options = {
    relativeTo: __dirname
};

const startServer = async function () {
    try {
        const server = await Glue.compose(Manifest.get('/'), options);
        await server.start();
        console.info(`Server started at ${ server.info.uri }`);
        console.table(os.cpus());
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};

startServer();
