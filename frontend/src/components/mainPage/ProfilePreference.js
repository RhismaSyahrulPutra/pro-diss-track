export default function ProfilePreference() {
  return `
    <div
      class="w-full"
      data-aos="fade"
      data-aos-duration="800"
    >
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">Profile Settings</h2>

      <form id="profile-settings-form" class="space-y-6">
        <!-- Photo Profile -->
        <div class="flex justify-center mb-6">
          <div class="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-xl font-semibold select-none">
            Photo
          </div>
        </div>

        <!-- Username full width -->
        <div>
          <label for="username" class="block mb-2 font-semibold text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username Anda"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- About Me full width -->
        <div>
          <label for="about" class="block mb-2 font-semibold text-gray-700">About Me</label>
          <textarea
            id="about"
            rows="3"
            placeholder="Tentang Anda"
            class="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <!-- Row: Umur dan Pekerjaan -->
        <div class="flex gap-4">
          <div class="w-24">
            <label for="age" class="block mb-2 font-semibold text-gray-700">Umur</label>
            <input
              type="number"
              id="age"
              min="0"
              placeholder="Umur"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="flex-1">
            <label for="job" class="block mb-2 font-semibold text-gray-700">Pekerjaan</label>
            <input
              type="text"
              id="job"
              placeholder="Pekerjaan Anda"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          class="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Simpan Profil
        </button>
      </form>
    </div>
  `;
}
