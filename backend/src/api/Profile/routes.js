const path = require('path');

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
    handler: handler.putProfileByAccountHandler,
  },
  {
    method: 'DELETE',
    path: '/profiles/me',
    handler: handler.deleteProfileByAccountHandler,
  },
  {
    method: 'POST',
    path: '/profiles/me/photo',
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
  {
    method: 'GET',
    path: '/uploads/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, '../../uploads'),
        redirectToSlash: true,
        index: false,
      },
    },
  },
];

module.exports = routes;
