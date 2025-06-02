const routes = (handler) => [
  {
    method: 'POST',
    path: '/lessons',
    handler: handler.postLessonHandler,
  },
  {
    method: 'GET',
    path: '/lessons',
    handler: handler.getAllLessonsHandler,
  },
  {
    method: 'GET',
    path: '/lessons/{id}',
    handler: handler.getLessonByIdHandler,
  },
  {
    method: 'PUT',
    path: '/lessons/{id}',
    handler: handler.putLessonByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/lessons/{id}',
    handler: handler.deleteLessonByIdHandler,
  },
  {
    method: 'GET',
    path: '/courses/{courseId}/lessons',
    handler: handler.getLessonsByCourseIdHandler,
  },
];

module.exports = routes;
