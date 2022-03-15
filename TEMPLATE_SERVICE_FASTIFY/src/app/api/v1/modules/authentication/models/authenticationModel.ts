import Postgres from "@connection/database/postgres";
const postgres = Postgres[Symbol.for('plugin-meta')].mod;
const Db = postgres.connection.DEFAULT;
const { QueryTypes } = postgres.Sequelize;


class AuthenticationModel{
  constructor(){

  }

  async index(){

  }

  static async auth(username: string,password: string){
    var response = {}
    await Db.query(
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

module.exports = AuthenticationModel;
