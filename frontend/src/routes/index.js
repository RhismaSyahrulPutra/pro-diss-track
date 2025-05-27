import feather from 'feather-icons';
import AOS from 'aos';

import { renderLanding } from './landingRoutes.js';
import { renderAuth } from './authRoutes.js';
import { renderApp } from './appRoutes.js';

import Navbar, { attachNavbarListeners } from '../components/Navbar.js';
import AuthNavbar, {
  attachAuthNavbarListeners,
} from '../components/auth/Navbar.js';

export function setupRouting(navbarContainer, app) {
  let currentNavbar = null;

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

  function handleNavigation() {
    const hash = window.location.hash || '#home';

    if (hash === '#login' || hash === '#signup') {
      navbarContainer.style.display = 'none';
      renderAuth(app, hash);
      return;
    }

    const appPages = ['#course', '#scanner', '#create-testimonial', '#profile'];
    if (appPages.includes(hash)) {
      navbarContainer.style.display = 'block';
      renderNavbar('auth');
      renderApp(app, hash);
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
