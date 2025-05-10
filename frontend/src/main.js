import './styles/style.css';
import './styles/tailwind.css';
import javascriptLogo from './assets/javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';

// Import AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import SweetAlert2
import Swal from 'sweetalert2';

// Import Feather Icons
import feather from 'feather-icons';

document.querySelector('#app').innerHTML = `
  <div class="text-center p-4">
    <a href="https://vite.dev" target="_blank" class="m-2">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" class="m-2">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1 class="text-3xl font-bold mt-4">Hello Vite!</h1>
    <div class="card mt-4 p-6 bg-gray-100 rounded-lg shadow-lg">
      <button id="counter" type="button" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"></button>
    </div>
    <div class="mt-6">
      <!-- Tombol dengan ikon Feather -->
      <button id="success-btn" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        <i data-feather="check-circle" class="text-white mr-2"></i> Tampilkan Notifikasi Sukses
      </button>
      <button id="error-btn" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
        <i data-feather="x-circle" class="text-white mr-2"></i> Tampilkan Notifikasi Error
      </button>
    </div>
    <p class="read-the-docs mt-4 text-lg text-gray-600">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector('#counter'));

// init AOS
AOS.init();

document.getElementById('success-btn').addEventListener('click', () => {
  Swal.fire({
    title: 'Berhasil!',
    text: 'Data berhasil disimpan.',
    icon: 'success',
    confirmButtonText: 'OK',
  });
});
document.getElementById('error-btn').addEventListener('click', () => {
  Swal.fire({
    title: 'Error!',
    text: 'Ada kesalahan saat menyimpan data.',
    icon: 'error',
    confirmButtonText: 'Coba Lagi',
  });
});

feather.replace();
