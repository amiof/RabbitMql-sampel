const amqp = require("amqplib");

async function fanoutPorducer() {
  const exchangeName = "log";
  const connection = await amqp.connect(process.env.URL);
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, "fanout");
  channel.publish(exchangeName, "", Buffer.from("fanout test queue"));
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 1000);
}

fanoutPorducer();
