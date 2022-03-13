'use strict';
const mongoose = require('mongoose');

exports.plugin = {
    register: (plugin, optionsArray) => {
      var connection={};
      optionsArray.forEach(options=> {
        const credential=options.credential;
        const node = `[${options.info.id} - ${options.info.env}]`;

        const node_connection = mongoose.createConnection(`mongodb://${credential.host}:${credential.port}/${encodeURIComponent(credential.database)}?authMechanism=SCRAM-SHA-256&authSource=admin`, {user: encodeURIComponent(credential.username), pass: encodeURIComponent(credential.password)});
        connection[options.info.id]=node_connection;

        node_connection.on('error', function (err) {
          console.log(` [*] ERROR - Unable to connect to the MONGODB:${node} database:`, err);
        });
        node_connection.once('open', function () {
          console.log(` [*] Connection to the MONGODB:${node} database has been established successfully.`);
        });

      });



      module.exports = {
        connection
      };

    },
    pkg: require('@root/package.json'),
    name : `mongodb`
};
