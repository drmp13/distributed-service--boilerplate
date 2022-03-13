'use strict';
const amqplib = require('amqplib');
function mb_subcribe(node,connection){

  connection.subcribes.forEach(subcribe=> {
    const message_callback = require('./callback/'+subcribe.callback)
    async function processMessage(msg) {
      var mail_log={};
      const adv_msg = msg.content.toString();
      try {
        var payload = JSON.parse(adv_msg);
        if (typeof payload !== 'undefined'){
          message_callback(payload)
        }else{
          //failed
        }
      } catch (err) {
        console.error(err.message);
      }
    }

    (async () => {
        const channel = await connection.createChannel();
        channel.prefetch(10);
        const queue = subcribe.queue;
        process.once('SIGINT', async () => {
          console.log('got sigint, closing connection');
          await channel.close();
          await connection.close();
          process.exit(0);
        });

        await channel.assertQueue(queue, {durable: true});
        await channel.consume(queue, async (msg) => {
          await processMessage(msg);
          await channel.ack(msg);
        },
        {
          noAck: false,
          consumerTag: 'email_consumer'
        });
        console.log(`     [*] RABBITMQ:${node} is subcribe for messages from queue "${queue}" and will process message at callback "${subcribe.callback}"`);
    })();

  })

}

exports.plugin = {
    register: (plugin, optionsArray) => {

      let promises = [];
      var connection={}
      optionsArray.forEach(options=> {
        const node = `[${options.info.id} - ${options.info.env}]`;
        const credential = options.credential;
        const amqpUrl = `amqp://${credential.username}:${credential.password}@${credential.host}:${credential.port}`;

        const node_connection = new Promise((resolve, reject) => {
          amqplib.connect(amqpUrl, "heartbeat=60")
          .then(function(connect) {
            connection[options.info.id]=connect;
            connection[options.info.id].subcribes = options.credential.workspace.subcribes;
            resolve(connect);
            mb_subcribe(node,connection[options.info.id]);
            console.log(` [*] Connection to the RABBITMQ:${node} message broker has been established successfully.`);
          }, function(err) {
           console.log(` [*] ERROR - Unable to connect to the RABBITMQ:${node} message broker:`, err);
           reject(Error("Failed"));
          });
        });
        promises.push(node_connection);
      })

      Promise.all(promises).then(function() {

        module.exports = {
          connection
        }
      });




    },
    pkg: require('@root/package.json'),
    name : `rabbitmq`
};
