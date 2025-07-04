import { BASE_URL } from '../../config/config';
import axios from 'axios';
import notyf from '../../utils/notyf';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Login() {
  const html = `
    <section
      class="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div class="max-w-md w-full bg-white p-8 rounded-xl shadow-md" data-aos="zoom-in" data-aos-delay="200">
        <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
        <form id="login-form" class="space-y-4" novalidate>
          <div>
            <label class="block mb-1 font-medium" for="username">Username</label>
            <input type="text" id="username" name="username" required
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label class="block mb-1 font-medium" for="password">Password</label>
            <div class="relative">
              <input type="password" id="password" name="password" required
                class="w-full px-4 py-2 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <button type="button" id="toggle-password"
                class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="Toggle password visibility">
                <i data-feather="eye"></i>
              </button>
            </div>
          </div>
          <button type="submit"
            class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Login</button>
        </form>
        <p class="text-center text-sm mt-4">Belum punya akun? <a href="#signup" class="text-blue-600 hover:underline">Daftar</a></p>
      </div>
    </section>
  `;

  setTimeout(() => {
    AOS.init();

    const form = document.querySelector('#login-form');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const username = form.username.value.trim();
      const password = form.password.value;

      try {
        const response = await axios.post(`${BASE_URL}/authentications`, {
          username,
          password,
        });

        const { accessToken, refreshToken, accountId } = response.data.data;
        console.log('Account ID:', accountId);

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('accountId', accountId);

        notyf.success('Login berhasil!');

        setTimeout(() => {
          window.location.hash = '#course';
        }, 1500);
      } catch (error) {
        console.error(error);
        notyf.error(
          error.response?.data?.message || 'Username atau password salah',
        );
      }
    });
  }, 0);

  return html;
}
