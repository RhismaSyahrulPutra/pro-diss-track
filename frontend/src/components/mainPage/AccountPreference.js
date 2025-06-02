import { BASE_URL } from '../../config/config';
import axios from 'axios';
import notyf from '../../utils/notyf';

export default function AccountPreference() {
  const accountId = localStorage.getItem('accountId');
  const accessToken = localStorage.getItem('accessToken');

  const html = `
    <div
      class="w-full"
      data-aos="fade"
      data-aos-duration="800"
    >
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">Account Settings</h2>

      <form id="account-settings-form" class="space-y-6">
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
              required
              placeholder="Masukkan password lama"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div class="flex-1">
            <label for="newPassword" class="block mb-2 font-semibold text-gray-700">Password Baru</label>
            <input
              type="password"
              id="newPassword"
              required
              placeholder="Masukkan password baru"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          class="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Ganti Password
        </button>
      </form>
    </div>
  `;

  setTimeout(() => {
    const form = document.getElementById('account-settings-form');
    const emailInput = form.querySelector('#email');

    async function loadEmail() {
      if (!accountId) {
        emailInput.value = 'Akun tidak ditemukan';
        notyf.error('AccountId tidak tersedia di localStorage');
        return;
      }
      if (!accessToken) {
        emailInput.value = 'Token akses tidak ditemukan';
        notyf.error('Access token tidak tersedia, silakan login ulang');
        return;
      }
      try {
        const { data } = await axios.get(`${BASE_URL}/accounts/${accountId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        emailInput.value = data.data.account.email || '';
      } catch {
        emailInput.value = 'Gagal memuat email';
        notyf.error('Gagal memuat data akun');
      }
    }

    loadEmail();

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!accountId) {
        notyf.error('AccountId tidak tersedia, tidak bisa ganti password');
        return;
      }
      if (!accessToken) {
        notyf.error('Access token tidak tersedia, silakan login ulang');
        return;
      }

      const currentPassword = form.querySelector('#currentPassword').value;
      const newPassword = form.querySelector('#newPassword').value;

      try {
        await axios.put(
          `${BASE_URL}/accounts/${accountId}/password`,
          {
            currentPassword,
            newPassword,
          },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );

        notyf.success('Password berhasil diubah');
        form.reset();
        await loadEmail();
      } catch (error) {
        notyf.error(error.response?.data?.message || 'Gagal mengubah password');
      }
    });
  }, 100);

  return html;
}
