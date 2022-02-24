'use strict';

exports.plugin = {
  register: (server, options) => {
  server.auth.strategy(options.pluginOptions.strategyName, options.schemeName, {
    apiKeys: options.pluginOptions.apiKeys
  });

},
name: 'api-key-static-worker'
};
