const CoursesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'courses',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const coursesHandler = new CoursesHandler(service, validator);
    server.route(routes(coursesHandler));
  },
};
