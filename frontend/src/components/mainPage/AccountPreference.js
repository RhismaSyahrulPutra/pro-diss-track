import { BASE_URL } from '../../config/config';
import axios from 'axios';
import notyf from '../../utils/notyf';

export default function AccountPreference() {
  const accountId = localStorage.getItem('accountId');
  const accessToken = localStorage.getItem('accessToken');

  const html = `
    <div class="w-full" data-aos="fade" data-aos-duration="800">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">Account Settings</h2>

      <form id="account-settings-form" class="space-y-6">
        <div>
          <label for="username" class="block mb-2 font-semibold text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            value="Loading..."
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label for="email" class="block mb-2 font-semibold text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value="Loading..."
            disabled
            class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        <div class="flex gap-6">
          <div class="flex-1">
            <label for="currentPassword" class="block mb-2 font-semibold text-gray-700">Password Lama</label>
            <input
              type="password"
              id="currentPassword"
              placeholder="Masukkan password lama"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div class="flex-1">
            <label for="newPassword" class="block mb-2 font-semibold text-gray-700">Password Baru</label>
            <input
              type="password"
              id="newPassword"
              placeholder="Masukkan password baru"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button type="submit" class="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
          Simpan Perubahan
        </button>
      </form>
    </div>
  `;

  setTimeout(() => {
    const form = document.getElementById('account-settings-form');
    const emailInput = form.querySelector('#email');
    const usernameInput = form.querySelector('#username');

    async function loadEmail() {
      if (!accountId) {
        emailInput.value = 'Akun tidak ditemukan';
        usernameInput.value = '—';
        notyf.error('AccountId tidak tersedia di localStorage');
        return;
      }
      if (!accessToken) {
        emailInput.value = 'Token akses tidak ditemukan';
        usernameInput.value = '—';
        notyf.error('Access token tidak tersedia, silakan login ulang');
        return;
      }

      try {
        const { data } = await axios.get(`${BASE_URL}/accounts/${accountId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const account = data.data.account;
        emailInput.value = account.email || '';
        usernameInput.value = account.username || '';
      } catch {
        emailInput.value = 'Gagal memuat email';
        usernameInput.value = '—';
        notyf.error('Gagal memuat data akun');
      }
    }

    loadEmail();

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const currentPassword = form
        .querySelector('#currentPassword')
        .value.trim();
      const newPassword = form.querySelector('#newPassword').value.trim();
      const username = form.querySelector('#username').value.trim();

      if (!accountId || !accessToken) {
        notyf.error('Akun tidak valid atau belum login');
        return;
      }

      if (!username && !newPassword) {
        notyf.error('Isi setidaknya username atau password baru');
        return;
      }

      if (newPassword && !currentPassword) {
        notyf.error('Masukkan password lama untuk mengganti password');
        return;
      }

      const payload = {};
      if (username) payload.username = username;
      if (newPassword) {
        payload.currentPassword = currentPassword;
        payload.newPassword = newPassword;
      }

      try {
        await axios.put(`${BASE_URL}/accounts/${accountId}/password`, payload, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        notyf.success('Perubahan berhasil disimpan');
        form.reset();
        await loadEmail();
      } catch (error) {
        notyf.error(
          error.response?.data?.message || 'Gagal menyimpan perubahan akun',
        );
      }
    });
  }, 100);

  return html;
}
