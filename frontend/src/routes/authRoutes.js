import Login from '../pages/auth/loginPage.js';
import SignUp from '../pages/auth/signUpPage.js';
import feather from 'feather-icons';

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

function fakeAuth(email, password) {
  return email === 'user@example.com' && password === '123456';
}

export function renderAuth(app, hash) {
  app.innerHTML = hash === '#login' ? Login() : SignUp();
  feather.replace();

  bindTogglePassword('toggle-password', 'password');
  if (hash === '#signup') {
    bindTogglePassword('toggle-confirm-password', 'confirmPassword');
  }

  const formId = hash === '#login' ? 'login-form' : 'signup-form';
  const form = document.getElementById(formId);
  if (!form) return;

  form.replaceWith(form.cloneNode(true));
  const freshForm = document.getElementById(formId);

  if (hash === '#login') {
    freshForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = freshForm.email.value.trim();
      const password = freshForm.password.value.trim();

      if (fakeAuth(email, password)) {
        window.location.hash = '#course';
      } else {
        alert('Email atau password salah!');
      }
    });
  }

  if (hash === '#signup') {
    freshForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = freshForm.username.value.trim();
      const email = freshForm.email.value.trim();
      const password = freshForm.password.value.trim();
      const confirmPassword = freshForm.confirmPassword.value.trim();

      if (!username) {
        alert('Username wajib diisi!');
        return;
      }
      if (password !== confirmPassword) {
        alert('Password dan konfirmasi password tidak cocok!');
        return;
      }

      alert(
        `Signup berhasil untuk username: ${username}, email: ${email}, silakan login`,
      );
      window.location.hash = '#login';
    });
  }
}
