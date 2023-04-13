const amqp = require("amqplib");

async function rpcConsumer() {
  const exName = "rpcEx";
  const connection = await amqp.connect(process.env.URL);
  const channel = await connection.createChannel();
  await channel.assertQueue(exName);
  console.log("await for get Task");
  await channel.consume(exName, (msg) => {
    console.log("resived data:", msg.content.toString());
    const dataResived = +msg.content.toString();
    const backData = dataResived * dataResived;
    channel.sendToQueue(msg.properties.replyTo, Buffer.from(backData.toString()), {
      persistent: true,
      correlationId: msg.properties.correlationId,
    });
    channel.ack(msg);
  });
}
rpcConsumer();
