require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');

// IMPORTANT
const config = require('./utils/config');
const plugins = require('./plugins');
const serverRoutes = require('./api/server');

// EXCEPTIONS
const AuthenticationError = require('./exceptions/AuthenticationError');
const AuthorizationError = require('./exceptions/AuthorizationError');
const ClientError = require('./exceptions/ClientError');
const ConflictError = require('./exceptions/ConflictError');
const InvariantError = require('./exceptions/InvariantError');
const InternalServerError = require('./exceptions/InternalServerError');
const NotFoundError = require('./exceptions/NotFoundError');
const ValidationError = require('./exceptions/ValidationError');

const init = async () => {
  const server = Hapi.server({
    port: config.app.port,
    host: config.app.host,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([{ plugin: Jwt }, { plugin: Inert }]);

  server.auth.strategy('pdt_jwt', 'jwt', {
    keys: config.accessToken?.key || '',
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: config.accessToken?.age || 1800,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  server.auth.default('pdt_jwt');

  await server.register(plugins);

  server.route(serverRoutes);

  server.ext('onPreResponse', (request, h) => {
    const response = request.response;

    if (response instanceof Error) {
      if (
        response instanceof ClientError ||
        response instanceof AuthenticationError ||
        response instanceof AuthorizationError ||
        response instanceof InvariantError ||
        response instanceof NotFoundError ||
        response instanceof ValidationError ||
        response instanceof ConflictError
      ) {
        const res = h.response({
          status: 'fail',
          message: response.message,
        });
        res.code(response.statusCode || 400);
        return res;
      }

      if (response instanceof InternalServerError) {
        const res = h.response({
          status: 'error',
          message: 'Terjadi kesalahan pada server kami',
        });
        res.code(500);
        console.error(response);
        return res;
      }

      const res = h.response({
        status: 'error',
        message: 'Terjadi kesalahan pada server kami',
      });
      res.code(response.statusCode || 500);
      console.error(response);
      return res;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
