import './styles/style.css';
import './styles/tailwind.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import feather from 'feather-icons';

import notyf from './utils/notyf.js';

import { setupRouting } from './routes/index.js';

AOS.init({ once: true });
feather.replace();

const navbarContainer = document.querySelector('#navbar');
const app = document.querySelector('#app');

setupRouting(navbarContainer, app);

notyf.success('Aplikasi siap digunakan!');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/pro-diss-track/service-worker.js')
    .then((reg) => console.log('Service Worker registered:', reg))
    .catch((err) => console.error('Service Worker registration failed:', err));
}

export { notyf };
