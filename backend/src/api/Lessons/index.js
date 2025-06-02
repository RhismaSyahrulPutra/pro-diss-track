const LessonsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'lessons',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const lessonsHandler = new LessonsHandler(service, validator);
    server.route(routes(lessonsHandler));
  },
};
