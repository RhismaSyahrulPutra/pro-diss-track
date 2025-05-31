require('dotenv').config();
const Hapi = require('@hapi/hapi');
const serverRoutes = require('./api/server');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
  });

  server.route(serverRoutes);

  await server.start();
  console.log(`Server berjalan pada: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
