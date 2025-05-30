export default function Profile() {
  return `
    <section class="py-24 min-h-screen px-4 overflow-x-hidden">
      <div class="max-w-screen-xl mx-auto">
        <!-- Header -->
        <h1 class="text-3xl font-bold text-gray-800 mb-4">MY PROFILE</h1>

        <div class="flex flex-col md:flex-row gap-8">
          <!-- Sidebar -->
          <aside class="w-full md:w-1/4 bg-white/80 border border-white/30 backdrop-blur-md rounded-xl shadow-lg p-4">
            <ul class="space-y-2">
              <li>
                <button id="profileBtn" class="w-full text-left block py-2 px-4 hover:bg-white/50 text-gray-800 font-medium transition">Profile</button>
              </li>
              <li>
                <button id="accountBtn" class="w-full text-left block py-2 px-4 hover:bg-white/50 text-gray-800 font-medium transition">Account</button>
              </li>
            </ul>
          </aside>

          <!-- Main Content -->
          <div id="contentArea" class="flex-1 bg-white/80 border border-white/30 backdrop-blur-md rounded-xl shadow-lg p-6">
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
