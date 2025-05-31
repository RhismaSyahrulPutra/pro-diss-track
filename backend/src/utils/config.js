const config = {
  app: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
  },
  rabbitMq: {
    server: process.env.RABBITMQ_SERVER || 'amqp://localhost',
  },
  redis: {
    host: process.env.REDIS_SERVER || '127.0.0.1',
    port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
  },
  accessToken: {
    key: process.env.ACCESS_TOKEN_KEY || '',
    age: process.env.ACCESS_TOKEN_AGE
      ? Number(process.env.ACCESS_TOKEN_AGE)
      : 1800,
  },
};

module.exports = config;
