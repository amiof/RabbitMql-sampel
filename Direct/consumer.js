const amqp = require("amqplib");
const dotenv = require("dotenv");
require("dotenv").config({ path: __dirname + "/.env" });

async function reciveFromPorducer() {
  const connection = await amqp.connect(process.env.URL);
  const channel = await connection.createChannel();
  const queueName = "service1";
  await channel.assertQueue(queueName, { durable: true });
  await channel.consume(queueName, (msg) => {
    console.log(msg.content.toString());
  });
}
reciveFromPorducer();
