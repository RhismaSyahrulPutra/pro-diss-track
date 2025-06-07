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
    } catch {
      const dummyTestimonials = [
        {
          rating: 5,
          username: 'Andi',
          testimonial_text: 'Aplikasi ini sangat membantu dan mudah digunakan!',
        },
        {
          rating: 4,
          username: 'Budi',
          testimonial_text: 'User interface-nya menarik dan performanya bagus.',
        },
        {
          rating: 5,
          username: 'Citra',
          testimonial_text: 'Saya sangat puas dengan fitur-fiturnya!',
        },
        {
          rating: 4,
          username: 'Dina',
          testimonial_text:
            'Pengalaman saya sangat menyenangkan dengan aplikasi ini.',
        },
        {
          rating: 5,
          username: 'Dina',
          testimonial_text:
            'Pengalaman saya sangat menyenangkan dengan aplikasi ini.',
        },
      ];

      const total = dummyTestimonials.reduce(
        (sum, t) => sum + Number(t.rating),
        0,
      );
      const average = total / dummyTestimonials.length;

      TestimonialView.renderAverageRating(avgRatingContainer, average);
      TestimonialView.renderTestimonials(
        testimonialListContainer,
        dummyTestimonials,
      );
    }
  },
};
