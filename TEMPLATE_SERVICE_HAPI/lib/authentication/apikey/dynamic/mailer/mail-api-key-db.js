'use strict';

// You can change this function into ur own authentication method
const apiKeyValidation= function validation(apiKey){
  if(apiKey=='drmp'){
    return {
      status: true,
      userdata: {
        name: 'Dwi Rizki Manggala Putra'
      }
    };
  }else{
    return {
      status: false
    };
  }
}

exports.plugin = {
  register: (server, options) => {
  server.auth.strategy('api-key--mail-db', 'api-key-dynamic', {
    apiKeyValidation
  });

},
name: 'api-key--mail-db'
};
