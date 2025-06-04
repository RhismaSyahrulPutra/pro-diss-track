const path = require('path');

const routes = (handler) => [
  // CREATE Profile
  {
    method: 'POST',
    path: '/profiles/{accountId}',
    handler: handler.postProfileHandler,
  },

  // READ Profile
  {
    method: 'GET',
    path: '/profiles/{accountId}',
    handler: handler.getProfileByAccountHandler,
  },

  // UPDATE Profile
  {
    method: 'PUT',
    path: '/profiles/{accountId}',
    handler: handler.putProfileByAccountHandler,
  },

  // DELETE Profile
  {
    method: 'DELETE',
    path: '/profiles/{accountId}',
    handler: handler.deleteProfileByAccountHandler,
  },

  // UPLOAD Profile Photo
  {
    method: 'POST',
    path: '/profiles/{accountId}/photo',
    handler: handler.postUploadPhotoHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        output: 'stream',
        parse: true,
        multipart: true,
        maxBytes: 5 * 1024 * 1024,
      },
    },
  },

  // GET Profile Photo
  {
    method: 'GET',
    path: '/profiles/{accountId}/photo',
    handler: handler.getProfilePhotoHandler,
  },

  // DELETE Profile Photo
  {
    method: 'DELETE',
    path: '/profiles/{accountId}/photo',
    handler: handler.deleteProfilePhotoHandler,
  },

  {
    method: 'GET',
    path: '/api/Profile/uploads/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, '..', 'Profile', 'uploads'),
        redirectToSlash: true,
        index: false,
      },
    },
    options: {
      auth: false,
    },
  },
];

module.exports = routes;
