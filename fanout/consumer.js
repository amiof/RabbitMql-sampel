const amqp = require("amqplib");

async function fanoutConsumer() {
  const exchangeName = "log";
  const connection = await amqp.connect(process.env.URL);
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, "fanout");
  const assertedQueue = await channel.assertQueue("", {
    exclusive: true,
  }); /* exclusive create a random unique name  */
  console.log("added queue white name :", assertedQueue.queue);
  channel.bindQueue(assertedQueue.queue, exchangeName, "");
  channel.consume(assertedQueue.queue, (msg) => {
    if (msg.content) {
      console.log(msg.content.toString());
      channel.ack();
    }
  });
}

fanoutConsumer();
