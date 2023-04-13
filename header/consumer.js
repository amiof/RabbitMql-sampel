const amqp = require("amqplib");
const exName = "headerEX";
async function consumerHeader() {
  const connection = await amqp.connect(process.env.URL);
  const channel = await connection.createChannel();
  const assertedQueue = await channel.assertQueue("", { exclusive: true });
  await channel.bindQueue(assertedQueue.queue, exName, "", {
    author: "amir",
    password: "123",
    "x-match": "all",
  });
  channel.consume(assertedQueue.queue, (msg) => {
    console.log(msg.content);
    console.log(msg.properties.headers);
  });
}
consumerHeader();
