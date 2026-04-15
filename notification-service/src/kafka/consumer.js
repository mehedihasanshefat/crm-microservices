const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "notification-service",
  brokers: [process.env.KAFKA_BROKER],
});

const consumer = kafka.consumer({ groupId: "notification-group" });

exports.startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "user-created" });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value.toString());

      // send realtime notification
      global.io.emit("notification", {
        message: `New user registered: ${data.email}`,
      });

      console.log("Realtime notification sent");
    },
  });
};
