import './styles/style.css';
import './styles/tailwind.css';

import Home from './pages/homePage.js';
import About from './pages/aboutPage.js';
import Testimonial from './pages/testimonialPage.js';
import Features from './pages/featuresPage.js';
import Login from './pages/auth/loginPage.js';
import SignUp from './pages/auth/signUpPage.js';

import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';

import AOS from 'aos';
import 'aos/dist/aos.css';
import feather from 'feather-icons';

AOS.init({
  once: true,
});
feather.replace();

const navbarContainer = document.querySelector('#navbar');
const app = document.querySelector('#app');

function bindTogglePassword(toggleId, inputId) {
  const toggle = document.getElementById(toggleId);
  const input = document.getElementById(inputId);
  if (!toggle || !input) return;
  let visible = false;
  toggle.addEventListener('click', () => {
    visible = !visible;
    input.type = visible ? 'text' : 'password';
    toggle.innerHTML = visible
      ? '<i data-feather="eye-off"></i>'
      : '<i data-feather="eye"></i>';
    feather.replace();
  });
}

function renderNavbar() {
  navbarContainer.style.display = 'block';
  navbarContainer.innerHTML = Navbar();
  feather.replace();

  const loginBtn = document.getElementById('login-button');
  const loginBtnMobile = document.getElementById('login-button-mobile');
  const mobileMenu = document.getElementById('mobile-menu');

  if (loginBtn)
    loginBtn.addEventListener('click', () => (window.location.hash = '#login'));
  if (loginBtnMobile)
    loginBtnMobile.addEventListener('click', () => {
      window.location.hash = '#login';
      if (mobileMenu) mobileMenu.classList.add('hidden');
    });

  const toggleBtn = document.getElementById('menu-toggle');
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () =>
      mobileMenu.classList.toggle('hidden'),
    );
    mobileMenu
      .querySelectorAll('a')
      .forEach((a) =>
        a.addEventListener('click', () => mobileMenu.classList.add('hidden')),
      );
  }
}

function renderMainContentOnce() {
  app.innerHTML = `
    <div id="home" class="section">${Home()}</div>
    <div id="about" class="section">${About()}</div>
    <div id="testimonial" class="section">${Testimonial()}</div>
    <div id="features" class="section">${Features()}</div>
    ${Footer()}
  `;
  feather.replace();
  AOS.refresh();
}

function handleNavigation() {
  const hash = window.location.hash;
  const isAuth = hash === '#login' || hash === '#signup';

  if (isAuth) {
    navbarContainer.style.display = 'none';
    app.innerHTML = hash === '#login' ? Login() : SignUp();
    feather.replace();

    if (hash === '#login') {
      bindTogglePassword('toggle-password', 'password');
    } else {
      bindTogglePassword('toggle-password', 'password');
      bindTogglePassword('toggle-confirm-password', 'confirmPassword');
    }
  } else {
    // Normal halaman utama
    if (!document.getElementById('home')) {
      // render semua section sekali saja
      renderNavbar();
      renderMainContentOnce();
    }

    navbarContainer.style.display = 'block';

    // scroll ke section jika hash cocok
    const targetId = hash.replace('#', '') || 'home';
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

renderNavbar();
handleNavigation();
window.addEventListener('hashchange', handleNavigation);
