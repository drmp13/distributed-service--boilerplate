const boom = require('@hapi/boom')
// const { Movies } = require('../models')
// const { isValidObjectId } = require('mongoose')
// const { MoviesRepository } = require('../repositories')
const { Unauthorized, NotFound, UnprocessableEntity } = require('http-errors')
const ResponseHelper = require('@rpc/response');
const AuthenticationModel = require("../models/authenticationModel");
const authenticationModel = new AuthenticationModel();
const JwtAuthSign = require("@authentication/jwt/jwtAuthSign");

exports.login = async (request, reply) => {
  try {
    const username = request.body.username;
    const password = request.body.password;

    const login = await authenticationModel.auth(username,password);
    if(login.error==null){
      if(login.data!==null){
        let userdata = {
            username : login.data.username,
            password: login.data.password
        };

        delete userdata.password;
        let jwtToken = JwtAuthSign.default(userdata);
        if(jwtToken!=null){
          ResponseHelper.sendResponseHTTP(reply, 200, "auth success", {'access-token': jwtToken});
        }else{
          ResponseHelper.sendResponseHTTP(reply, 500);
        }
      }else{
        ResponseHelper.sendResponseHTTP(reply, 401, "auth data not found");
      }
    }else{
      ResponseHelper.sendResponseHTTP(reply, 400);
    }
  } catch (err) {
    throw boom.boomify(err)
  }
};

exports.test = async (request, reply) => {
  if (!request.auth.isAuthenticated) {
    ResponseHelper.sendResponseHTTP(reply, 401, "failed");
  }else{
    ResponseHelper.sendResponseHTTP(reply, 200, "authenticated",{auth:request.auth.userdata});
  }
};
