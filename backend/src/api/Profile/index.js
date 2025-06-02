const ProfilesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'profiles',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const profilesHandler = new ProfilesHandler(service, validator);
    server.route(routes(profilesHandler));
  },
};
