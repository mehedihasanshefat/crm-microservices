const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "auth-service",
  brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
};

const sendEvent = async (topic, message) => {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
};

module.exports = { connectProducer, sendEvent };
