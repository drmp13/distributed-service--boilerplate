'use strict';
require('module-alias/register');
const ResponseHelper = require('@rpc/response');
const UserModel = require("../models/userModel");
const userModel = new UserModel();
const jwtAuthSign = require("@authentication/jwt/jwtAuthSign");


exports.login = async (request, h) => {
  var response;
  const payload = Object.assign({},request.payload);
  const login = await userModel.auth(payload.username,payload.password);

  if(login.error==null){
    if(login.data!==null){
      let userdata = {
          username : login.data.username,
          password: login.data.password
      };
      let jwtToken = jwtAuthSign(userdata);
      if(jwtToken!=null){
        response = ResponseHelper.sendResponseHTTP(h, 200, "auth success", {'access-token': jwtToken});
      }else{
        response = ResponseHelper.sendResponseHTTP(h, 500);
      }
    }else{
      response = ResponseHelper.sendResponseHTTP(h, 401, "auth data not found");
    }
  }else{
    response = ResponseHelper.sendResponseHTTP(h, 400);
  }

  console.log(response)
  return response;
};

exports.test = async (request, h) => {
  if (!request.auth.isAuthenticated) {
    return ResponseHelper.sendResponseHTTP(h, 401, "failed");
  }else{
    return ResponseHelper.sendResponseHTTP(h, 200, "authenticated",{headers:request.headers});
  }
};

exports.test_api_key_static = async (request, h) => {
  if (!request.auth.isAuthenticated) {
    return ResponseHelper.sendResponseHTTP(h, 401, "failed");
  }else{
    return ResponseHelper.sendResponseHTTP(h, 200, "authenticated",{headers:request.headers});
  }
};
