const amqp = require("amqplib");

const [pattern] = process.argv.slice(2);
async function consumer() {
  const exName = "topiiiic";
  const connection = await amqp.connect(process.env.URL);
  const channel = await connection.createChannel();
  await channel.assertExchange(exName, "topic");
  const assertedQue = await channel.assertQueue("", { exclusive: true, durable: true });
  await channel.bindQueue(assertedQue.queue, exName, pattern);
  console.log("the pattern is :", pattern);
  channel.consume(assertedQue.queue, (msg) => {
    console.log(msg.content.toString());
    channel.ack(msg);
  });
}
consumer();
