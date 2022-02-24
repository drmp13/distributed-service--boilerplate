const postgres = require("@connection/database/postgres");
const { QueryTypes } = postgres.queryTypes;
const db = postgres.connection.DEFAULT;

class UserModel{
  constructor(){

  }

  async index(){

  }

  async auth(username,password){

    var response = {}
    await db.query(
     `SELECT *
      FROM users
      WHERE username=$username
            AND password=$password`,
      {
        bind: {
          username: username,
          password: password
        },
        type: QueryTypes.SELECT,
        plain: true,
        raw: true
      }
    ).then((value) => {
      response = {
        data: value
      };
    }).catch(err => {
      response = {
        error: err
      };
    });
    return response;
  }

}

module.exports = UserModel;
