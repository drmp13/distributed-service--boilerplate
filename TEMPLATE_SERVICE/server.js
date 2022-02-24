'use strict';
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
