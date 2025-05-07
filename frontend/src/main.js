import './styles/style.css';
import './styles/tailwind.css';
import javascriptLogo from './assets/javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';

// Import AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

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
    <p class="read-the-docs mt-4 text-lg text-gray-600">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector('#counter'));

// init AOS
AOS.init();
