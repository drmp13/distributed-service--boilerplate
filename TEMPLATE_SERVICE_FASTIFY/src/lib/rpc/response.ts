'use strict';

exports.sendResponseHTTP = async function (reply, code: number, message: string, data: any) {
    const response_success = [200,201];
    const response_failed = [400,404,409,401,500];
    let response = {}
    code = parseInt(code);

    if(!(response_success.includes(code) || response_failed.includes(code))){
      code = 400;
    }

    if(response_success.includes(code)){
      if(message==null){
        message="success";
      }
      response={ statusCode: code,
                 message: message,
                 data: data
               }
    }

    if(response_failed.includes(code)){
      if(message==null){
        message="failed";
      }
      response={ statusCode: code,
                 message: message
               }
    }

    return reply.code(code).send(response);
};
