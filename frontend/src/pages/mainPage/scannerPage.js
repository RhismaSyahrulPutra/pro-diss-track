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
    <section
      class="h-screen flex flex-col bg-gray-50 px-4 py-20 overflow-hidden"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <main class="flex flex-col items-center justify-center gap-6 w-full flex-grow">
        <div
          class="relative"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="800"
        >
          <video
            id="cameraStream"
            autoplay
            playsinline
            muted
            class="w-full max-w-2xl rounded-xl shadow-2xl object-cover border-4 border-indigo-300"
            style="aspect-ratio: 4 / 3; max-height: 60vh;"
          ></video>
          <div
            id="cameraStatus"
            class="absolute bottom-2 right-2 bg-red-100 text-red-700 text-sm px-3 py-1 rounded shadow transition-colors duration-300"
          >
            Memeriksa kamera...
          </div>
        </div>

        <div
          id="detectedCard"
          class="bg-white border border-gray-200 rounded-xl shadow-xl p-6 w-full max-w-lg text-center transition-all duration-300 ease-in-out hover:shadow-2xl"
          data-aos="fade-up"
          data-aos-delay="400"
          data-aos-duration="800"
        >
          <p class="text-md font-medium text-gray-700 mb-3">Huruf yang Anda buat adalah:</p>
          <p
            id="detectedLetter"
            class="text-5xl font-black text-blue-700 animate-pulse"
          >
            A
          </p>
        </div>
      </main>
    </section>
  `;
}
