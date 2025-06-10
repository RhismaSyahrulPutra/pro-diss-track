import { BASE_URL } from '../../config/config';
import axios from 'axios';
import notyf from '../../utils/notyf';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function SignUp() {
  const html = `
    <section
      class="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div class="max-w-md w-full bg-white p-8 rounded-xl shadow-md" data-aos="zoom-in" data-aos-delay="200">
        <h2 class="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form id="signup-form" class="space-y-4" novalidate>
          <div>
            <label for="username" class="block mb-1 font-medium">Username</label>
            <input type="text" id="username" name="username" required
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label for="email" class="block mb-1 font-medium">Email</label>
            <input type="email" id="email" name="email" required
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div class="relative">
            <label for="password" class="block mb-1 font-medium">Password</label>
            <input type="password" id="password" name="password" required
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10" />
            <button type="button" id="toggle-password" aria-label="Toggle password visibility"
              class="absolute right-3 top-9 text-gray-600 focus:outline-none">
              <i data-feather="eye"></i>
            </button>
          </div>
          <div class="relative">
            <label for="confirmPassword" class="block mb-1 font-medium">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10" />
            <button type="button" id="toggle-confirm-password" aria-label="Toggle confirm password visibility"
              class="absolute right-3 top-9 text-gray-600 focus:outline-none">
              <i data-feather="eye"></i>
            </button>
          </div>
          <button type="submit" 
            class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Sign Up
          </button>
        </form>
        <p class="text-center text-sm mt-4">Sudah punya akun? 
          <a href="#login" class="text-blue-600 hover:underline">Login</a>
        </p>
      </div>
    </section>
  `;

  setTimeout(() => {
    AOS.init();

    if (window.feather) {
      window.feather.replace();
    }

    const form = document.querySelector('#signup-form');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const username = form.username.value.trim();
      const email = form.email.value.trim();
      const password = form.password.value;
      const confirmPassword = form.confirmPassword.value;

      if (password !== confirmPassword) {
        notyf.error('Password dan Confirm Password tidak cocok!');
        return;
      }

      const payload = {
        username,
        email,
        password,
        created_at: new Date().toISOString(),
        last_login: null,
      };

      try {
        const response = await axios.post(`${BASE_URL}/accounts`, payload);
        let welcomeName = null;
        if (response.data.username) {
          welcomeName = response.data.username;
        } else if (response.data.data && response.data.data.username) {
          welcomeName = response.data.data.username;
        }

        if (welcomeName) {
          notyf.success(`Registrasi berhasil! Selamat datang, ${welcomeName}`);
        } else {
          notyf.success('Registrasi berhasil! Silakan login.');
        }

        form.reset();

        setTimeout(() => {
          window.location.hash = '#login';
        }, 1500);
      } catch (error) {
        console.error(error);
        notyf.error(
          error.response?.data?.message || 'Terjadi kesalahan saat registrasi',
        );
      }
    });
  }, 0);

  return html;
}
