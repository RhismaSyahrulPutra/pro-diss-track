const routes = (handler) => [
  {
    method: 'GET',
    path: '/accounts',
    handler: handler.getAllAccountsHandler,
    options: {
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/accounts',
    handler: handler.postAccountHandler,
    options: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/accounts/{accountId}',
    handler: handler.getAccountHandler,
  },
  {
    method: 'PUT',
    path: '/accounts/{accountId}',
    handler: handler.putAccountHandler,
  },
  {
    method: 'DELETE',
    path: '/accounts/{accountId}',
    handler: handler.deleteAccountHandler,
  },
];

module.exports = routes;
