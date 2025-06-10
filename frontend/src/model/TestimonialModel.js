import axios from 'axios';
import { BASE_URL } from '../config/config';

export const TestimonialModel = {
  async fetchTestimonials() {
    try {
      const res = await axios.get(`${BASE_URL}/testimonials`);
      return res.data.data.testimonials;
    } catch {
      throw new Error('Gagal memuat testimonial');
    }
  },
};
