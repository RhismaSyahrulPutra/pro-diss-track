import axios from 'axios';
import { BASE_URL } from '../config/config';

export const TestimonialModel = {
  async fetchTestimonials() {
    try {
      // Data dummy testimonial
      const dummyTestimonials = [
        {
          id: 1,
          username: 'Arif Satria',
          testimonial_text: 'Pelayanan sangat memuaskan',
          rating: 4
        },
        {
          id: 2,
          username: 'Zaelani Wira',
          testimonial_text: 'Web pembelajaran yang menarik untuk pemula',
          rating: 5
        }
      ];

      // Ambil data dari API
      const res = await axios.get(`${BASE_URL}/testimonials`);
      const apiTestimonials = res.data.data.testimonials || [];

      // Gabungkan data dummy dengan data dari API
      return [...dummyTestimonials, ...apiTestimonials];
    } catch {
      // Return data dummy jika API error
      return [
        {
          id: 1,
          username: 'Arif Satria',
          testimonial_text: 'Pelayanan sangat memuaskan.',
          rating: 4
        },
        {
          id: 2,
          username: 'Zaelani Wira',
          testimonial_text: 'Web pembelajaran yang menarik untuk pemula.',
          rating: 5
        },
        {
          id: 3,
          username: 'Rizki',
          testimonial_text: 'Masih butuh beberapa perbaikan, tapi secara keseluruhan aplikasinya sangat inspiratif.',
          rating: 5
        },
        {
          id: 4,
          username: 'Muhammad',
          testimonial_text: 'Bisa jadi bekal penting kalau suatu saat kerja bareng teman tuli. Salut sama tim developernya!',
          rating: 5
        },
        {
          id: 5,
          username: 'Denis',
          testimonial_text: 'Kontennya edukatif dan disusun dengan baik. Akan lebih menarik kalau ada fitur video interaktif langsung dengan native signer.',
          rating: 5
        },
        {
          id: 5,
          username: 'Adit',
          testimonial_text: 'Sangat bermanfaat untuk edukasi inklusif di sekolah. Anak-anak juga antusias menggunakannya.',
          rating: 5
        },
        {
          id: 5,
          username: 'Chellyn',
          testimonial_text: 'Desain antarmukanya menarik dan sangat intuitif. Saya suka sistem pembelajarannya.',
          rating: 5
        },
        {
          id: 5,
          username: 'Nadya',
          testimonial_text: 'Saya suka dengan progress trackernya. User experience-nya juga cukup smooth.',
          rating: 5
        },
        {
          id: 5,
          username: 'Kevin Aprilio',
          testimonial_text: 'Aplikasi ini menjembatani komunikasi antar dunia yang berbeda. Salut!',
          rating: 5
        },
        {
          id: 5,
          username: 'Aulia Kirani',
          testimonial_text: 'Sangat membantu saya memahami dasar-dasar bahasa isyarat. Terima kasih!',
          rating: 5
        },
        {
          id: 5,
          username: 'David Christanto',
          testimonial_text: 'Saya jadi lebih mengerti pentingnya aksesibilitas. Semoga makin banyak orang pakai aplikasi ini.',
          rating: 5
        },
        {
          id: 5,
          username: 'George',
          testimonial_text: 'Materinya sudah cukup lengkap. Kalau bisa ditambah fitur diskusi komunitas, pasti makin mantap.',
          rating: 4
        }
      ];
    }
  }
};
