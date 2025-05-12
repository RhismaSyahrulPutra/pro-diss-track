import './styles/style.css';
import './styles/tailwind.css';

// Import Pages
import Home from './pages/homePage.js';
import About from './pages/aboutPage.js';
import Testimonial from './pages/testimonialPage.js';
import Features from './pages/featuresPage.js';

// Import Components
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';

// Import AOS
import AOS from 'aos';
import 'aos/dist/aos.css';
import feather from 'feather-icons';

// Render ke DOM
document.querySelector('#app').innerHTML = `
  <div>
    ${Navbar()}
    <div id="home" class="section">
      ${Home()}
    </div>
    <div id="about" class="section">
      ${About()}
    </div>
    <div id="testimonial" class="section">
      ${Testimonial()}
    </div>
    <div id="features" class="section">
      ${Features()}
    </div>
    ${Footer()}
  </div>
`;

// Inisialisasi Feather icons
feather.replace();

// Inisialisasi AOS dan feather icons
AOS.init();
feather.replace();
