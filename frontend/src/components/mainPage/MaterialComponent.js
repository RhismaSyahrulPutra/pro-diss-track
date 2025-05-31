export default function MaterialComponent() {
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
        <h1 class="text-3xl font-bold text-gray-800 mb-4">MATERI</h1>

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
                <button id="materi1Btn" class="w-full text-left block py-2 px-4 hover:bg-white/50 text-gray-800 font-medium transition">Pengenalan Frontend</button>
              </li>
              <li>
                <button id="materi2Btn" class="w-full text-left block py-2 px-4 hover:bg-white/50 text-gray-800 font-medium transition">Dasar HTML</button>
              </li>
              <!-- Tambahkan materi lainnya di sini -->
            </ul>
          </aside>

          <!-- Main Content -->
          <div
            id="materialContent"
            class="flex-1 bg-white/80 border border-white/30 backdrop-blur-md rounded-xl shadow-lg p-6"
            data-aos="fade-up"
            data-aos-delay="600"
            data-aos-duration="800"
          >
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Silakan pilih materi</h2>
            <p class="text-gray-700 text-sm leading-relaxed">
              Konten materi akan tampil di sini setelah kamu memilih dari daftar di sebelah kiri.
            </p>
          </div>
        </div>
      </div>
    </section>
  `;
}
