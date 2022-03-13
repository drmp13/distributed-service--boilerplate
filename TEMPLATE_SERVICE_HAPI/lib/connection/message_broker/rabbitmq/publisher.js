const amqplib = require('amqplib');
const publish = async function publish(credential,config,payload){
    const amqpUrl = `amqp://${credential.username}:${credential.password}@${credential.host}:${credential.port}`;
    var conn = await amqplib.connect(amqpUrl, "heartbeat=60");
    var ch = await conn.createChannel();
    var exch = config.queue;
    var q = config.queue;
    var rkey = '';
    var msg = JSON.stringify(payload);


    try {
      await ch.assertExchange(exch, 'direct', {confirm: true, durable: true}).catch(console.error);
      await ch.assertQueue(q, {durable: true});
      await ch.bindQueue(q, exch, rkey);
      await ch.publish(exch, rkey, Buffer.from(msg));
      return `Message has been published to "${config.queue}"`;
    } catch(err) {
      return `Failed to publish message: ${err}`;
    } finally {
      setTimeout( function()  {
          ch.close();
          conn.close();
      },  500 );
    }
}

module.exports = {
  publish: publish
}
