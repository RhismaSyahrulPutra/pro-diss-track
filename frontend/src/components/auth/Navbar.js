import feather from 'feather-icons';
import Logo_PDT from '/icons/Logo_PDT.svg';

export default function AuthNavbar() {
  return `
    <nav class="fixed top-0 left-0 right-0 bg-white shadow-lg z-50" data-aos="fade-down" data-aos-duration="1000">
      <div class="container mx-auto p-4 flex justify-between items-center">
        <div class="flex items-center" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">
          <img src="${Logo_PDT}" alt="Logo" class="h-12 mr-3">
          <a href="#home"><span class="text-lg font-bold">PRO DISS TRACK</span></a>
        </div>

        <button id="menu-toggle" class="md:hidden focus:outline-none" data-aos="fade-left" data-aos-delay="200" data-aos-duration="1000">
          <i data-feather="menu" class="w-6 h-6"></i>
        </button>

        <div class="hidden md:flex space-x-12 items-center" data-aos="fade-left" data-aos-delay="300" data-aos-duration="1000">
          <a href="#course" class="text-sm font-semibold">Course</a>
          <a href="#scanner" class="text-sm font-semibold">Scanner</a>
          <a href="#create-testimonial" class="text-sm font-semibold">Testimonial</a>

          <div class="relative">
            <button id="settings-button" class="text-sm font-semibold flex items-center gap-1">
              Settings
              <i data-feather="chevron-down" class="w-4 h-4"></i>
            </button>
            <div id="settings-dropdown" class="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md opacity-0 invisible transition-opacity duration-200 z-10">
              <a href="#profile" class="block px-4 py-2 text-sm hover:bg-gray-100">Profile</a>
              <button id="logout-button" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</button>
            </div>
          </div>
        </div>
      </div>

      <div id="mobile-menu" class="md:hidden hidden container mx-auto px-4 pb-4 space-y-2">
        <a href="#course" class="block text-sm font-semibold py-4 flex items-center">
          <i data-feather="book" class="w-5 h-5 mr-2"></i> Course
        </a>
        <a href="#scanner" class="block text-sm font-semibold py-4 flex items-center">
          <i data-feather="camera" class="w-5 h-5 mr-2"></i> Scanner
        </a>
        <a href="#create-testimonial" class="block text-sm font-semibold py-4 flex items-center">
          <i data-feather="message-circle" class="w-5 h-5 mr-2"></i> Testimonial
        </a>

        <div class="border-t border-gray-200 pt-2">
          <button id="mobile-settings-toggle" class="w-full text-left text-sm font-semibold py-2 flex items-center justify-between">
            Settings
            <i data-feather="chevron-down" class="w-4 h-4"></i>
          </button>
          <div id="mobile-settings-menu" class="hidden mt-1 ml-4 space-y-1">
            <a href="#profile" class="block text-sm py-2 text-gray-700">Profile</a>
            <button id="logout-button-mobile" class="block w-full text-left text-sm py-2 text-red-600">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  `;
}

export function attachAuthNavbarListeners() {
  feather.replace();

  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  const settingsBtn = document.getElementById('settings-button');
  const settingsDropdown = document.getElementById('settings-dropdown');
  if (settingsBtn && settingsDropdown) {
    settingsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = !settingsDropdown.classList.contains('opacity-0');
      if (isVisible) {
        settingsDropdown.classList.add('opacity-0', 'invisible');
        settingsDropdown.classList.remove('opacity-100');
      } else {
        settingsDropdown.classList.remove('opacity-0', 'invisible');
        settingsDropdown.classList.add('opacity-100');
      }
    });

    document.addEventListener('click', () => {
      settingsDropdown.classList.add('opacity-0', 'invisible');
      settingsDropdown.classList.remove('opacity-100');
    });
  }

  const mobileToggle = document.getElementById('mobile-settings-toggle');
  const mobileSettingsMenu = document.getElementById('mobile-settings-menu');
  if (mobileToggle && mobileSettingsMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileSettingsMenu.classList.toggle('hidden');
    });
  }

  const logoutBtn = document.getElementById('logout-button');
  const logoutBtnMobile = document.getElementById('logout-button-mobile');

  function logoutHandler() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accountId');
    window.location.replace(window.location.pathname + '#home');
  }

  if (logoutBtn) logoutBtn.addEventListener('click', logoutHandler);
  if (logoutBtnMobile) logoutBtnMobile.addEventListener('click', logoutHandler);
}
