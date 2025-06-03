const ProfilesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'profiles',
  version: '1.0.0',
  register: async (server, { service, validator, storageService }) => {
    const profilesHandler = new ProfilesHandler(
      service,
      validator,
      storageService
    );
    server.route(routes(profilesHandler));
  },
};
