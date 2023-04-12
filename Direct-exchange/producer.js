const amqp = require("amqplib");

const [pattern, msg] = process.argv.slice(2);
async function producer() {
  const exName = "direct-ex";
  const connection = await amqp.connect(process.env.URL);
  const channel = await connection.createChannel();
  await channel.assertExchange(exName, "direct");
  channel.publish(exName, pattern, Buffer.from(msg), { persistent: true });
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 1000);
}
producer();
