import { BASE_URL } from '../../config/config';
import axios from 'axios';
import notyf from '../../utils/notyf';

export default function SignUp() {
  const html = `
    <section class="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div class="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 class="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form id="signUpForm" class="space-y-4">
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
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <button type="button" id="toggle-password" class="absolute right-3 top-9 text-gray-600">
              <i data-feather="eye"></i>
            </button>
          </div>
          <div class="relative">
            <label for="confirmPassword" class="block mb-1 font-medium">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <button type="button" id="toggle-confirm-password" class="absolute right-3 top-9 text-gray-600">
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
    const form = document.querySelector('#signUpForm');

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
        // Cek username di response
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

        // Navigasi ke halaman login, misalnya hash route
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
