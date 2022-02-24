'use strict';
require('module-alias/register');
const ResponseHelper = require('@rpc/response');
const MailSender =  require('@lib/mailer/sender');
const MailLogModel = require("../models/mailLogModel");
const mailLogModel = new MailLogModel();

exports.sendMail = async (request, h) => {
  const payload = Object.assign({},request.payload);
  const sendMail = await MailSender.sendMail(payload);
  await mailLogModel.insertLog(sendMail);

  return ResponseHelper.sendResponseHTTP(h, 200, "success", sendMail);
};
