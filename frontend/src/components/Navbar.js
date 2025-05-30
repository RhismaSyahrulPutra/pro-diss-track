import feather from 'feather-icons';
import Logo_PDT from '/icons/Logo_PDT.svg';

export default function Navbar() {
  return `
    <nav class="fixed top-0 left-0 right-0 bg-white shadow-lg z-50" data-aos="fade-down" data-aos-duration="1000">
      <div class="container mx-auto p-4 flex justify-between items-center">
        <!-- Logo -->
        <div class="flex items-center" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">
          <img src="${Logo_PDT}" alt="Logo" class="h-12 mr-3">
          <a href="#home"><span class="text-lg font-bold">PRO DISS TRACK</span></a>
        </div>

        <!-- Hamburger menu for mobile -->
        <button id="menu-toggle" class="md:hidden focus:outline-none" data-aos="fade-left" data-aos-delay="200" data-aos-duration="1000">
          <i data-feather="menu" class="w-6 h-6"></i>
        </button>

        <!-- Desktop menu -->
        <div class="hidden md:flex space-x-12 items-center" data-aos="fade-left" data-aos-delay="300" data-aos-duration="1000">
          <a href="#home" class="text-sm font-semibold">Home</a>
          <a href="#about" class="text-sm font-semibold">About</a>
          <a href="#features" class="text-sm font-semibold">Features</a>
          <a href="#testimonial" class="text-sm font-semibold">Testimonial</a>
          <button id="login-button" class="px-4 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-semibold">
            Sign In / Sign Up
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div id="mobile-menu" class="md:hidden hidden container mx-auto px-4 pb-4 space-y-2">
        <a href="#home" class="block text-sm font-semibold py-4 flex items-center" data-aos="fade-up" data-aos-delay="400">
          <i data-feather="home" class="w-5 h-5 mr-2"></i> Home
        </a>
        <a href="#about" class="block text-sm font-semibold py-4 flex items-center" data-aos="fade-up" data-aos-delay="500">
          <i data-feather="info" class="w-5 h-5 mr-2"></i> About
        </a>
        <a href="#features" class="block text-sm font-semibold py-4 flex items-center" data-aos="fade-up" data-aos-delay="700">
          <i data-feather="star" class="w-5 h-5 mr-2"></i> Features
        </a>
        <a href="#testimonial" class="block text-sm font-semibold py-4 flex items-center" data-aos="fade-up" data-aos-delay="600">
          <i data-feather="users" class="w-5 h-5 mr-2"></i> Testimonial
        </a>
        <button id="login-button-mobile" class="block w-full px-4 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-semibold flex items-center" data-aos="fade-up" data-aos-delay="800">
          <i data-feather="log-in" class="w-5 h-5 mr-2"></i> Sign In / Sign Up
        </button>
      </div>
    </nav>
  `;
}

export function attachNavbarListeners() {
  feather.replace();

  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  const loginBtn = document.getElementById('login-button');
  const loginBtnMobile = document.getElementById('login-button-mobile');
  function loginHandler() {
    window.location.hash = '#login';
  }
  if (loginBtn) loginBtn.addEventListener('click', loginHandler);
  if (loginBtnMobile) loginBtnMobile.addEventListener('click', loginHandler);
}
