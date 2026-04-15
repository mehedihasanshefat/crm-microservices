const { Kafka } = require("kafkajs");
const Customer = require("../models/Customer");

const kafka = new Kafka({
  clientId: "crm-service",
  brokers: [process.env.KAFKA_BROKER],
});

const consumer = kafka.consumer({ groupId: "crm-group" });

exports.startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "user-created" });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value.toString());

      // create CRM customer automatically
      await Customer.create({
        userId: data.userId,
        email: data.email,
        name: data.name,
      });

      console.log("Customer profile auto-created");
    },
  });
};
