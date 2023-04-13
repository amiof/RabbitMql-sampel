const amqp = require("amqplib");
const { v4: uuidv4 } = require("uuid");

const msg = process.argv.slice(2);
const uuid = uuidv4();
async function rpcProducer() {
  const exName = "rpcEx";
  const connection = await amqp.connect(process.env.URL);
  const channel = await connection.createChannel();
  const assertedQueue = await channel.assertQueue("", { exclusive: true });
  channel.sendToQueue(exName, Buffer.from(msg.toString()), {
    replyTo: assertedQueue.queue,
    correlationId: uuid,
  });
  await channel.consume(assertedQueue.queue, (msg) => {
    if (msg.properties.correlationId == uuid) {
      console.log("data comeback : ", msg.content.toString());
      channel.ack(msg);
      setTimeout(() => {
        connection.close();
        process.exit(0);
      });
    }
  });
}
rpcProducer();
