export default function Profile() {
  return `
    <section
      class="py-24 px-4 overflow-x-hidden"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div
        class="max-w-screen-xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="800"
      >
        <!-- Header -->
        <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">MY PROFILE</h1>

        <div class="flex flex-col md:flex-row gap-8">
          <!-- Sidebar -->
          <aside
            class="w-full md:w-1/4 bg-white/80 border border-white/30 backdrop-blur-md rounded-xl shadow-lg p-4 self-start"
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-duration="800"
          >
            <ul class="space-y-2">
              <li>
                <button id="profileBtn" class="w-full text-left block py-3 px-4 hover:bg-white/50 text-gray-800 font-medium transition rounded-md">
                  Profile
                </button>
              </li>
              <li>
                <button id="accountBtn" class="w-full text-left block py-3 px-4 hover:bg-white/50 text-gray-800 font-medium transition rounded-md">
                  Account
                </button>
              </li>
            </ul>
          </aside>

          <!-- Main Content -->
          <div
            id="contentArea"
            class="flex-1 bg-white/80 border border-white/30 backdrop-blur-md rounded-xl shadow-lg p-6 min-h-[300px]"
            data-aos="fade-up"
            data-aos-delay="600"
            data-aos-duration="800"
          >
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Welcome to your profile</h2>
            <p class="text-gray-700 text-sm leading-relaxed">
              Silakan pilih menu di sidebar untuk melihat atau mengubah data profil dan akun Anda.
            </p>
          </div>
        </div>
      </div>
    </section>
  `;
}
