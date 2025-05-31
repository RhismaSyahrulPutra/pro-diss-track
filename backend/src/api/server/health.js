module.exports = {
  method: 'GET',
  path: '/health',
  handler: () => ({
    status: 'success',
    message: 'Server sehat dan siap!',
  }),
};
