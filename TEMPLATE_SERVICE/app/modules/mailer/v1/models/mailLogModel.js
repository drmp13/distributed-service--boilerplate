const Mongoose = require('mongoose');
const mongodb = require("@connection/database/mongodb");
const db = mongodb.connection.DEFAULT;
const emailSchema = new Mongoose.Schema({
  smtp: {
    type: Object,
    required: true,
  },
  payload: {
    type: Object,
    required: true,
  },
  delivery: {
    type: Object,
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date
  },
  deleted_at: {
    type: Date
  }
});

class MailLogModel{
  constructor(){

  }

  async index(){

  }

  async insertLog(data){
    db.model("Email", emailSchema).create(data);
  }
}

module.exports = MailLogModel;
