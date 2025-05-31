const amqp = require('amqplib');
const config = require('../../utils/config');

const ProducerService = {
  sendMessage: async (queue, message) => {
    let connection;
    let channel;

    try {
      connection = await amqp.connect(config.rabbitMq.server);
      channel = await connection.createChannel();
      await channel.assertQueue(queue, { durable: true });

      const msgBuffer =
        typeof message === 'string'
          ? Buffer.from(message)
          : Buffer.from(JSON.stringify(message));

      await channel.sendToQueue(queue, msgBuffer);
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    } finally {
      if (channel) await channel.close();
      if (connection) await connection.close();
    }
  },
};

module.exports = ProducerService;
