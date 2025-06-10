const routes = (handler) => [
  {
    method: 'POST',
    path: '/courses',
    handler: handler.postCourseHandler,
  },
  {
    method: 'GET',
    path: '/courses',
    handler: handler.getAllCoursesHandler,
  },
  {
    method: 'GET',
    path: '/courses/{id}',
    handler: handler.getCourseByIdHandler,
  },
  {
    method: 'PUT',
    path: '/courses/{id}',
    handler: handler.putCourseByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/courses/{id}',
    handler: handler.deleteCourseByIdHandler,
  },
];

module.exports = routes;
