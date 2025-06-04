import { BASE_URL } from '../../config/config';
import axios from 'axios';
import notyf from '../../utils/notyf';
import 'aos/dist/aos.css';

export default function TestimonialForm() {
  let selectedRating = 0;

  async function loadUsername() {
    const usernameInput = document.getElementById('username');
    if (!usernameInput) return;

    const accountId = localStorage.getItem('accountId');
    const accessToken = localStorage.getItem('accessToken');

    if (!accountId || !accessToken) {
      usernameInput.value = '';
      notyf.error('Tidak dapat memuat username. Silakan login ulang.');
      return;
    }

    try {
      const { data } = await axios.get(`${BASE_URL}/accounts/${accountId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const username = data?.data?.account?.username || '';
      usernameInput.value = username;
    } catch {
      usernameInput.value = '';
      notyf.error('Gagal memuat username dari server.');
    }
  }

  function setupStarRating() {
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('rating');

    stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        selectedRating = index + 1;
        ratingInput.value = selectedRating;
        updateStars(selectedRating);
      });

      star.addEventListener('mouseover', () => {
        updateStars(index + 1);
      });

      star.addEventListener('mouseout', () => {
        updateStars(selectedRating);
      });
    });
  }

  function updateStars(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, idx) => {
      if (idx < rating) {
        star.classList.add('text-yellow-400');
        star.classList.remove('text-gray-300');
      } else {
        star.classList.remove('text-yellow-400');
        star.classList.add('text-gray-300');
      }
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const accessToken = localStorage.getItem('accessToken');
    const testimonialText =
      document.getElementById('testimonial')?.value.trim() || '';
    const rating = parseInt(document.getElementById('rating')?.value, 10);
    const username = document.getElementById('username')?.value || '';

    if (!username) {
      notyf.error('Username tidak tersedia. Gagal mengirim testimonial.');
      return;
    }

    if (!testimonialText) {
      notyf.error('Testimonial tidak boleh kosong.');
      return;
    }

    if (!rating || rating < 1 || rating > 5) {
      notyf.error('Silakan pilih rating antara 1 sampai 5.');
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/testimonials`,
        {
          username,
          testimonial_text: testimonialText,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      notyf.success('Testimonial berhasil dikirim!');
      const form = document.getElementById('testimonial-form');
      form.reset();
      selectedRating = 0;
      updateStars(0);

      await loadUsername();
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal mengirim testimonial.';
      notyf.error(msg);
    }
  }

  document.addEventListener('DOMContentLoaded', async () => {
    await loadUsername();

    const form = document.getElementById('testimonial-form');
    if (form) {
      form.addEventListener('submit', handleSubmit);
    }

    setupStarRating();
  });

  return `
    <section
      class="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4 pt-5"
      data-aos="fade-up"
    >
      <div class="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 class="text-2xl font-bold mb-6 text-center text-blue-700">YOUR TESTIMONIAL</h2>
        <form id="testimonial-form" class="space-y-4">
          <div>
            <label class="block mb-1 font-medium" for="username">Username</label>
            <input
              type="text"
              id="username"
              readonly
              required
              class="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Memuat username..."
            />
          </div>
          <div>
            <label class="block mb-1 font-medium">Rating</label>
            <div id="star-rating" class="flex gap-2 cursor-pointer">
              ${[1, 2, 3, 4, 5]
                .map(
                  () => `
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="none" class="star w-8 h-8 text-gray-300 transition-colors duration-200">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                `,
                )
                .join('')}
            </div>
            <input type="hidden" id="rating" name="rating" required />
          </div>
          <div>
            <label class="block mb-1 font-medium" for="testimonial">Testimonial</label>
            <textarea
              id="testimonial"
              rows="4"
              required
              class="w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Tulis testimonial Anda di sini..."
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Kirim
          </button>
        </form>
      </div>
    </section>
  `;
}
