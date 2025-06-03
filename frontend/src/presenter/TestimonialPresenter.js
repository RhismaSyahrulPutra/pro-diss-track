import { TestimonialModel } from '../model/TestimonialModel.js';
import { TestimonialView } from '../view/TestimonialView.js';

export const TestimonialPresenter = {
  async init() {
    const avgRatingContainer = document.getElementById('average-rating');
    const testimonialListContainer =
      document.getElementById('testimonial-list');

    if (!avgRatingContainer || !testimonialListContainer) {
      console.error('Container element testimonial tidak ditemukan');
      return;
    }

    TestimonialView.renderLoading(testimonialListContainer);

    try {
      const testimonials = await TestimonialModel.fetchTestimonials();

      const total = testimonials.reduce((sum, t) => sum + Number(t.rating), 0);
      const average = testimonials.length ? total / testimonials.length : 0;

      TestimonialView.renderAverageRating(avgRatingContainer, average);
      TestimonialView.renderTestimonials(
        testimonialListContainer,
        testimonials,
      );
    } catch (err) {
      testimonialListContainer.innerHTML = `<p class="col-span-full text-center text-red-500">${err.message}</p>`;
    }
  },
};
