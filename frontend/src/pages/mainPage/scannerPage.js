export default function Scanner() {
  setTimeout(() => {
    const video = document.getElementById('cameraStream');
    const statusBadge = document.getElementById('cameraStatus');
    const uploadedImage = document.getElementById('uploadedImage');
    const predictionResult = document.getElementById('detectedLetter');

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

    document.getElementById('btnSnapshot').onclick = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      uploadedImage.src = dataUrl;
      uploadedImage.style.display = 'block';
    };

    document.getElementById('btnRemove').onclick = () => {
      uploadedImage.src = '';
      uploadedImage.style.display = 'none';
      predictionResult.innerText = '';
    };

    document.getElementById('btnPredict').onclick = async () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append('file', blob, 'snapshot.png');
        try {
          const res = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: formData,
          });
          if (!res.ok) {
            const errorData = await res.json();
            alert('Terjadi kesalahan: ' + errorData.message);
            return;
          }
          const data = await res.json();
          predictionResult.innerText = data.prediction;
        } catch (err) {
          alert('Gagal melakukan prediksi: ' + err.message);
        }
      }, 'image/png');
    };
  }, 0);

  return `
    <section class="py-24 px-4">
      <div class="w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-8">

        <!-- Kolom 1: Kamera + Tombol -->
        <div class="flex flex-col items-center space-y-6">
          <div class="relative w-full aspect-video rounded-xl overflow-hidden border-4 border-indigo-300 shadow-xl max-h-[70vh]">
            <video id="cameraStream" autoplay playsinline muted class="w-full h-full object-cover"></video>
            <div id="cameraStatus" class="absolute bottom-3 right-3 bg-red-100 text-red-700 text-sm px-3 py-1 rounded shadow transition-colors duration-300">
              Memeriksa kamera...
            </div>
          </div>

          <div class="flex flex-wrap justify-center gap-4">
            <button id="btnSnapshot" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Ambil Foto</button>
            <button id="btnRemove" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-gray-600 transition">Hapus Foto</button>
            <button id="btnPredict" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Prediksi</button>
          </div>
        </div>

        <!-- Kolom 2: Card hasil -->
        <div class="w-full rounded-xl shadow-xl border border-gray-200 text-center flex flex-col items-center space-y-4">
          <img
            id="uploadedImage"
            src=""
            alt="Snapshot"
            class="w-full max-w-[300px] max-h-[220px] hidden rounded-lg shadow object-contain"
          />
          <h2 class="text-lg font-semibold text-gray-700">Huruf yang Anda buat adalah:</h2>
          <p id="detectedLetter" class="text-[clamp(3rem,8vw,6rem)] font-extrabold text-blue-600 animate-pulse">–</p>
        </div>


      </div>
    </section>
  `;
}
