const AccountsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'accounts',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const accountsHandler = new AccountsHandler(service, validator);
    server.route(routes(accountsHandler));
  },
};
