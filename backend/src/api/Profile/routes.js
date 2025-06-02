const routes = (handler) => [
  {
    method: 'POST',
    path: '/profiles',
    handler: handler.postProfileHandler,
  },
  {
    method: 'GET',
    path: '/profiles/me',
    handler: handler.getProfileByAccountHandler,
  },
  {
    method: 'PUT',
    path: '/profiles/me',
    handler: handler.putProfileByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/profiles/me',
    handler: handler.deleteProfileByIdHandler,
  },
];

module.exports = routes;
