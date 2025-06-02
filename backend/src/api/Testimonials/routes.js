const routes = (handler) => [
  {
    method: 'POST',
    path: '/testimonials',
    handler: handler.postTestimonialHandler,
  },
  {
    method: 'GET',
    path: '/testimonials',
    handler: handler.getAllTestimonialsHandler,
    options: { auth: false },
  },
  {
    method: 'GET',
    path: '/testimonials/me',
    handler: handler.getTestimonialByAccountHandler,
  },
  {
    method: 'PUT',
    path: '/testimonials/me',
    handler: handler.putTestimonialByAccountHandler,
  },
  {
    method: 'DELETE',
    path: '/testimonials/me',
    handler: handler.deleteTestimonialByAccountHandler,
  },
];

module.exports = routes;
