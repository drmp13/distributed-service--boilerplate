'use strict';

exports.plugin = {
  register: (server, options) => {
    server.auth.strategy('jwt-auth', 'jwt', {
        keys: {
          key: options.key,
          algorithms: options.algorithms
        },
        verify: options.verify,
        validate: (artifacts, request, h) => {
          try {
            let decoded=artifacts.decoded.payload.userdata;
            let username = decoded.username;

            if (username!='') {
              request.headers.userdata = {
                username: username
              }
              return {
                  isValid: true
              };
            } else {
              console.log('Invalid Credential');
              return {
                isValid: false
              };
            }
          } catch (error) {
            return {
              isValid: false
            };
          }
        }
    });
  },
  name: 'jwt-auth'
};
