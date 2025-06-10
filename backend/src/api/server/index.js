const healthRoutes = require('./health');

module.exports = [
  {
    method: 'GET',
    path: '/',
    options: {
      auth: false,
    },
    handler: () => ({
      status: 'success',
      message: 'Server berjalan dengan baik!',
      appHost: process.env.APP_HOST || '',
    }),
  },
  {
    method: 'GET',
    path: '/favicon.ico',
    options: {
      auth: false,
    },
    handler: (request, h) => h.response().code(204),
  },
  ...healthRoutes,
];
