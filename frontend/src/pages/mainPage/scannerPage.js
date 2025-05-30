export default function Scanner() {
  return `
    <section class="min-h-screen flex flex-col bg-gray-50 px-4 py-6 overflow-hidden">
      <header class="text-center mb-6 flex-shrink-0">
        <h1 class="text-3xl font-bold text-gray-800">Scanner latihan bahasa Isyarat</h1>
      </header>

      <main class="flex flex-col items-center flex-grow min-h-0">
        <video
          id="cameraStream"
          autoplay
          playsinline
          class="w-full max-w-xl rounded-lg shadow-lg object-cover"
          style="aspect-ratio: 4 / 3; max-height: 60vh; transform: none;"
        ></video>

        <div
          id="detectedCard"
          class="mt-4 bg-white border border-gray-300 rounded-md shadow-md p-6 text-center text-gray-800"
          style="width: 100%; max-width: 580px;"
        >
          <p class="text-lg font-medium mb-2">Huruf yang Anda buat adalah:</p>
          <p id="detectedLetter" class="text-6xl font-extrabold">A</p>
        </div>
      </main>
    </section>
  `;
}
