import Course from '../pages/mainPage/coursePage.js';
import Scanner from '../pages/mainPage/scannerPage.js';
import CreateTestimonial from '../pages/mainPage/testimonialPage.js';
import Profile from '../pages/mainPage/profilePage.js';
import MaterialComponent from '../components/mainPage/MaterialComponent.js';

const pages = {
  '#course': Course,
  '#scanner': Scanner,
  '#create-testimonial': CreateTestimonial,
  '#profile': Profile,
  '#material': MaterialComponent,
};

export function renderApp(app, hash) {
  const page = pages[hash];
  if (page) {
    app.innerHTML = page();
  } else {
    app.innerHTML = `<h1>Page Not Found</h1>`;
  }
}
