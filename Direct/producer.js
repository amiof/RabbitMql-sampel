const amqp = require("amqplib");
const dotenv = require("dotenv");
require("dotenv").config({ path: __dirname + "/.env" });

async function connectToService1() {
  const connection = await amqp.connect(process.env.URL);
  const channel = await connection.createChannel();
  const queueName = "service1";
  await channel.assertQueue(queueName, { durable: true });
  channel.sendToQueue(queueName, Buffer.from("hello rabbit"));
}
connectToService1();
