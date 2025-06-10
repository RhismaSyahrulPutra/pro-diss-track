import feather from 'feather-icons';
import AOS from 'aos';

import { renderLanding } from './landingRoutes.js';
import { renderAuth } from './authRoutes.js';
import { renderApp } from './appRoutes.js';

import Navbar, { attachNavbarListeners } from '../components/Navbar.js';
import AuthNavbar, {
  attachAuthNavbarListeners,
} from '../components/auth/Navbar.js';

import ProfilePreference from '../components/mainPage/ProfilePreference.js';
import AccountPreference from '../components/mainPage/AccountPreference.js';

import Lesson from '../pages/mainPage/lessonPage.js';

export function setupRouting(navbarContainer, app) {
  let currentNavbar = null;
  let cameraStream = null;

  function renderNavbar(type = 'public') {
    if (currentNavbar === type) return;

    if (type === 'public') {
      navbarContainer.innerHTML = Navbar();
      attachNavbarListeners();
    } else if (type === 'auth') {
      navbarContainer.innerHTML = AuthNavbar();
      attachAuthNavbarListeners();
    }
    currentNavbar = type;
    feather.replace();

    if (type === 'public') {
      const loginBtn = document.getElementById('login-button');
      if (loginBtn)
        loginBtn.addEventListener(
          'click',
          () => (window.location.hash = '#login'),
        );
    }
  }

  function attachProfileListeners() {
    const profileBtn = document.getElementById('profileBtn');
    const accountBtn = document.getElementById('accountBtn');
    const contentArea = document.getElementById('contentArea');

    function setActive(button) {
      [profileBtn, accountBtn].forEach((btn) => {
        btn.classList.remove('border-b-2', 'border-blue-500');
      });
      button.classList.add('border-b-2', 'border-blue-500');
    }

    if (profileBtn && accountBtn && contentArea) {
      profileBtn.addEventListener('click', () => {
        contentArea.innerHTML = ProfilePreference();
        setActive(profileBtn);
      });

      accountBtn.addEventListener('click', () => {
        contentArea.innerHTML = AccountPreference();
        setActive(accountBtn);
      });

      setActive(profileBtn);
    }
  }

  function openUserCamera() {
    const videoElement = document.getElementById('cameraStream');
    if (!videoElement) return;

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        cameraStream = stream;
        videoElement.srcObject = stream;
      })
      .catch((error) => {
        console.error('Tidak bisa membuka kamera:', error);
      });
  }

  function stopUserCamera() {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      cameraStream = null;
    }
  }

  async function loadLessonFromHash() {
    const hash = location.hash || '';
    const queryStart = hash.indexOf('?');
    const queryString = queryStart >= 0 ? hash.slice(queryStart + 1) : '';

    try {
      const html = await Lesson(queryString);
      app.innerHTML = html;
    } catch (err) {
      app.innerHTML = `<section class="py-24 min-h-screen px-4 bg-gray-50">
        <h1>Gagal memuat pelajaran.</h1>
        <p>${err.message}</p>
      </section>`;
      console.error('Error saat loadLessonFromHash:', err);
    }
  }

  async function handleNavigation() {
    const fullHash = window.location.hash || '#home';

    stopUserCamera();

    const [rawPath] = fullHash.split('?');

    const path = rawPath.startsWith('#/') ? '#' + rawPath.slice(2) : rawPath;

    if (path === '#login' || path === '#signup') {
      navbarContainer.style.display = 'none';
      renderAuth(app, fullHash);
      return;
    }

    const appPages = [
      '#course',
      '#scanner',
      '#create-testimonial',
      '#profile',
      '#lesson',
    ];

    if (appPages.includes(path)) {
      navbarContainer.style.display = 'block';
      renderNavbar('auth');

      if (path === '#lesson') {
        await loadLessonFromHash();
      } else {
        renderApp(app, fullHash);

        if (path === '#profile') {
          setTimeout(() => {
            attachProfileListeners();
          }, 0);
        } else if (path === '#scanner') {
          setTimeout(() => {
            openUserCamera();
          }, 0);
        }
      }
      return;
    }

    navbarContainer.style.display = 'block';
    renderNavbar('public');
    renderLanding(app);

    AOS.refresh();

    const targetId = path.replace('#', '') || 'home';
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  (async () => {
    await handleNavigation();
  })();

  window.addEventListener('hashchange', () => {
    handleNavigation();
  });
}
