'use strict';
const Config = require('@config/_core');
const Nodemailer = require("nodemailer");
const Handlebars = require('handlebars');
const Fs = require('fs');

exports.plugin = {
    register: (plugin, options) => {
        function transformMail(mails_src){
          var mails=[];
          for (const val of mails_src) {
            if(val.alias!="" && val.alias!=null){
              var mail = `"${val.alias}" <${val.email}>`;
            }else{
              var mail = val.email;
            }
            mails.push(mail);
          }
          return mails;
        }

        exports.sendMail = function mail(payload) {
          const type = options.type[payload.type];
          const mail_config=options.account[type.account];
          var msg = '';
          var response = {
            "smtp" : {
              "smtp_address": mail_config.smtp_address,
              "smtp_port": mail_config.smtp_port,
              "smtp_user": mail_config.email,
              "smtp_user_alias": mail_config.alias
            },
            "payload": payload
          };

          var email_template=type.template;
          var content=payload.mail_propeties.content;

          const transporter = Nodemailer.createTransport({
              host: mail_config.smtp_address,
              port: mail_config.smtp_port,
              secure: mail_config.smtp_secure,
              auth: {
                user: mail_config.email,
                pass: mail_config.password
              }
          });

          var template_content_err = [];
          if(email_template!=null && email_template!=''){
            for (const prop of email_template.propeties) {
              if(!content.hasOwnProperty(prop)){
                template_content_err.push(prop);
              }
            }
            var html=Fs.readFileSync(email_template.path, {encoding: 'utf-8'});
            var template = Handlebars.compile(html);
            msg = template(content);
          }else{
            if(typeof(content)==="string"){
              msg=content;
            }else{
              response.delivery = {
                "is_sent": false,
                "message": `wrong mail content format`
              }
              return response;
            }
          }

          if(template_content_err.length>0){
            response.delivery = {
              "is_sent": false,
              "message": `template propety missing: ${template_content_err}`
            }
            return response;
          }


          if(mail_config.alias!="" && mail_config.alias!=null){
            var mail_from = `"${mail_config.alias}" <${mail_config.email}>`;
          }else{
            var mail_from = mail_config.email;
          }

          const mailOptions = {
              from: mail_from,
              to: transformMail(payload.mail_propeties.receiver),
              cc: transformMail(payload.mail_propeties.cc),
              bcc: transformMail(payload.mail_propeties.bcc),
              subject: payload.mail_propeties.subject,
              html: msg
          };


          return new Promise(function (resolve, reject){
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                response.delivery = {
                  "is_sent": false,
                  "message": error
                }
                resolve(response);
              } else {
                response.delivery = {
                  "is_sent": true,
                  "message": info.response
                };
                resolve(response);
              }
            });
          });
        };

    },
    pkg: require('@root/package.json'),
    name: 'mailer'
};
