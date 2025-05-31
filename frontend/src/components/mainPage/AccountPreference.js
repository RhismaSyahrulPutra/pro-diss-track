export default function AccountPreference() {
  return `
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
            value="user@example.com"
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
}
