const TestimonialsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'testimonials',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const testimonialsHandler = new TestimonialsHandler(service, validator);
    server.route(routes(testimonialsHandler));
  },
};
