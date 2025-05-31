const healthRoute = require('./health');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: () => ({
      status: 'success',
      message: 'Server berjalan dengan baik!',
      appHost: process.env.APP_HOST || '',
    }),
  },
  healthRoute,
];
