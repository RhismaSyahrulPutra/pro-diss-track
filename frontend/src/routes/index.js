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

  function handleNavigation() {
    const hash = window.location.hash || '#home';

    stopUserCamera();

    if (hash === '#login' || hash === '#signup') {
      navbarContainer.style.display = 'none';
      renderAuth(app, hash);
      return;
    }

    const appPages = [
      '#course',
      '#scanner',
      '#create-testimonial',
      '#profile',
      '#material',
    ];
    if (appPages.includes(hash)) {
      navbarContainer.style.display = 'block';
      renderNavbar('auth');
      renderApp(app, hash);

      if (hash === '#profile') {
        setTimeout(() => {
          attachProfileListeners();
        }, 0);
      } else if (hash === '#scanner') {
        setTimeout(() => {
          openUserCamera();
        }, 0);
      }

      return;
    }

    navbarContainer.style.display = 'block';
    renderNavbar('public');
    renderLanding(app);

    AOS.refresh();

    const targetId = hash.replace('#', '') || 'home';
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  handleNavigation();
  window.addEventListener('hashchange', handleNavigation);
}
