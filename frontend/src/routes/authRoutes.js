import Login from '../pages/auth/loginPage.js';
import SignUp from '../pages/auth/signUpPage.js';
import feather from 'feather-icons';
import notyf from '../utils/notyf.js';

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

function attachToggleListeners(hash) {
  bindTogglePassword('toggle-password', 'password');
  if (hash === '#signup') {
    bindTogglePassword('toggle-confirm-password', 'confirmPassword');
  }
}

export function renderAuth(app, hash) {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const allowedHashes = ['#login', '#signup'];
  if ((!accessToken || !refreshToken) && !allowedHashes.includes(hash)) {
    window.location.hash = '#home';
    return;
  }

  app.innerHTML = hash === '#login' ? Login() : SignUp();
  feather.replace();

  const formId = hash === '#login' ? 'login-form' : 'signup-form';
  const form = document.getElementById(formId);
  if (!form) return;

  form.replaceWith(form.cloneNode(true));
  const freshForm = document.getElementById(formId);

  attachToggleListeners(hash);

  if (hash === '#signup') {
    freshForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = freshForm.username.value.trim();
      const email = freshForm.email.value.trim();
      const password = freshForm.password.value.trim();
      const confirmPassword = freshForm.confirmPassword.value.trim();

      if (!username) {
        notyf.error('Username wajib diisi!');
        return;
      }

      if (password !== confirmPassword) {
        notyf.error('Password dan konfirmasi password tidak cocok!');
        return;
      }

      notyf.success(
        `Signup berhasil untuk username: ${username}, email: ${email}, silakan login`,
      );
      window.location.hash = '#login';
    });
  }
}
