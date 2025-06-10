export default function Scanner() {
  setTimeout(() => {
    const video = document.getElementById('cameraStream');
    const statusBadge = document.getElementById('cameraStatus');

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
        statusBadge.textContent = 'Kamera Aktif';
        statusBadge.classList.remove('bg-red-100', 'text-red-700');
        statusBadge.classList.add('bg-green-100', 'text-green-700');
      })
      .catch((err) => {
        statusBadge.textContent = 'Kamera Tidak Aktif';
        statusBadge.classList.remove('bg-green-100', 'text-green-700');
        statusBadge.classList.add('bg-red-100', 'text-red-700');
        console.error('Tidak bisa mengakses kamera:', err);
      });
  }, 0);

  return `
    <section class="min-h-dvh bg-gray-50 flex items-center justify-center px-4 md:px-6 pt-20">
      <div class="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

        <!-- Kamera -->
        <div class="relative w-full rounded-xl overflow-hidden border-4 border-indigo-300 shadow-xl max-h-[80vh] aspect-video md:aspect-[4/3]">
          <video
            id="cameraStream"
            autoplay
            playsinline
            muted
            class="w-full h-full object-cover"
          ></video>
          <div
            id="cameraStatus"
            class="absolute bottom-3 right-3 bg-red-100 text-red-700 text-xs sm:text-sm px-3 py-1 rounded shadow transition-colors duration-300"
          >
            Memeriksa kamera...
          </div>
        </div>

        <!-- Deteksi Huruf -->
        <div class="w-full max-h-[80vh] bg-white p-6 md:p-8 rounded-xl shadow-xl border border-gray-200 text-center flex flex-col justify-center">
          <h2 class="text-base sm:text-lg font-semibold text-gray-700 mb-4">
            Huruf yang Anda buat adalah:
          </h2>
          <p
            id="detectedLetter"
            class="text-[clamp(3rem,8vw,6rem)] font-extrabold text-blue-600 animate-pulse"
          >
            A
          </p>
        </div>

      </div>
    </section>
  `;
}
