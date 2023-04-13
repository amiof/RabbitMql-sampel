const amqp = require("amqplib");
const msg = process.argv.slice(2);
async function producerHeader() {
  exName = "headerEX";
  const connection = await amqp.connect(process.env.URL);
  const channel = await connection.createChannel();
  await channel.assertExchange(exName, "headers", { durable: true });
  channel.publish(exName, "", Buffer.from(msg), {
    headers: {
      author: "amir",
      pass: "12345",
      price: "500$",
      comments: [],
    },
    persistent: true,
  });
}
producerHeader();
